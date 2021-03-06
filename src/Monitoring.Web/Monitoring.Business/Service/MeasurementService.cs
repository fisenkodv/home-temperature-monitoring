using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.Extensions.Caching.Memory;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Business.Service
{
    [UsedImplicitly]
    public class MeasurementService
    {
        private const int Threshold = 1; // was 10 and the comment for 10, each device sends measurement each 10 seconds, i.e. persist data each ~10(measutements)*10(seconds)/60(seconds) = 1.66(minute)
        private const int MaximumNumberOfMeasurements = 500;
        private readonly IDeviceRepository _deviceRepository;
        private readonly IMeasurementRepository _measurementRepository;

        private readonly IMemoryCache _memoryCache;

        public MeasurementService(IMemoryCache memoryCache,
            IMeasurementRepository measurementRepository,
            IDeviceRepository deviceRepository)
        {
            _memoryCache = memoryCache;
            _measurementRepository = measurementRepository;
            _deviceRepository = deviceRepository;
        }

        public async Task CreateMeasurement(string deviceUuid, float temperature, float humidity)
        {
            var device = await _deviceRepository.GetDevice(deviceUuid);
            if (device == null)
                await _deviceRepository.CreateDevice(deviceUuid, "unknown device", true);

            if (!_memoryCache.TryGetValue<List<Measurement>>(deviceUuid, out var measurements))
                measurements = new List<Measurement>();

            var measurement = new Measurement
                {DeviceUuid = deviceUuid, Humidity = humidity, Temperature = temperature, TimeStamp = DateTime.UtcNow};
            measurements.Add(measurement);
            if (measurements.Count > Threshold)
            {
                await _measurementRepository.CreateMeasurements(measurements);
                measurements.Clear();
            }

            _memoryCache.Set(deviceUuid, measurements);
        }

        public async Task<Measurement> GetLatestMeasurement(string deviceUuid)
        {
            if (_memoryCache.TryGetValue<List<Measurement>>(deviceUuid, out var measurements) && measurements.Any())
                return measurements.Last();

            return await _measurementRepository.GetLatestMeasurement(deviceUuid);
        }

        public async Task<IEnumerable<Measurement>> GetMeasurements(string deviceUuid, int hours)
        {
            if (hours > 24 * 31)
                return Enumerable.Empty<Measurement>();

            var measurements = await _measurementRepository.GetMeasurements(deviceUuid, hours);

            return FilterMeasurements(measurements, MaximumNumberOfMeasurements);
        }

        private static IEnumerable<Measurement> FilterMeasurements(IEnumerable<Measurement> measurements, int maxItems)
        {
            var measurementsList = measurements.OrderBy(x => x.TimeStamp).ToList();
            var timeDiff = measurementsList.Last().TimeStamp - measurementsList.First().TimeStamp;
            var interval = timeDiff.TotalSeconds / maxItems;

            var nextTimeStamp = measurementsList.First().TimeStamp.AddSeconds(interval);
            foreach (var measurement in measurementsList)
            {
                if (measurement.TimeStamp < nextTimeStamp) continue;
                nextTimeStamp = measurement.TimeStamp.AddSeconds(interval);
                yield return measurement;
            }
        }
    }
}
