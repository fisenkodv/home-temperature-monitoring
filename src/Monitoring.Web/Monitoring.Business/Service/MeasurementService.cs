using System;
using System.Collections;
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
    private const int Threshold = 60; // each ~10 minutes 

    private readonly IMemoryCache _memoryCache;
    private readonly IMeasurementRepository _measurementRepository;
    private readonly IDeviceRepository _deviceRepository;

    public MeasurementService(IMemoryCache memoryCache, IMeasurementRepository measurementRepository,
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

      measurements.Add(new Measurement {Humidity = humidity, Temperature = temperature, TimeStamp = DateTime.UtcNow});
      if (measurements.Count > Threshold)
      {
        await _measurementRepository.CreateMeasurements(deviceUuid, measurements);
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

      // skip unnecessary measurements based on the following rules:
      // if 'hour' return each 30 seconds
      // if 'day' return each 30 minutes
      // if 'week' return each 4 hours
      // if 'month' return each 12 hours
      var measurements = await _measurementRepository.GetMeasurements(deviceUuid, hours);

      return FilterMeasurements(measurements, GetOffset(hours));
    }

    private TimeSpan GetOffset(int hours)
    {
      if (hours <= 1)
        return TimeSpan.FromSeconds(30);
      else if (hours > 1 && hours <= 24)
        return TimeSpan.FromMinutes(30);
      else if (hours > 24 && hours <= 7 * 24)
        return TimeSpan.FromHours(4);
      else return TimeSpan.FromHours(12);
    }

    private IEnumerable<Measurement> FilterMeasurements(IEnumerable<Measurement> measurements, TimeSpan offset)
    {
      var nextMeasurementTime = measurements.First().TimeStamp.Add(offset);
      foreach (var measurement in measurements)
      {
        if (measurement.TimeStamp < nextMeasurementTime) continue;
        nextMeasurementTime = measurement.TimeStamp;
        yield return measurement;
      }
    }
  }
}