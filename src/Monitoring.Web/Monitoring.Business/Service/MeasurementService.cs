using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Business.Service
{
  [UsedImplicitly]
  public class MeasurementService
  {
    private readonly IMeasurementRepository _measurementRepository;
    private readonly IDeviceRepository _deviceRepository;

    public MeasurementService(IMeasurementRepository measurementRepository, IDeviceRepository deviceRepository)
    {
      _measurementRepository = measurementRepository;
      _deviceRepository = deviceRepository;
    }

    public async Task CreateMeasurement(string deviceUuid, float temperature, float humidity)
    {
      var device = await _deviceRepository.GetDevice(deviceUuid);
      if (device == null)
      {
        await _deviceRepository.CreateDevice(deviceUuid, "unknown device", true);
      }

      await _measurementRepository.CreateMeasurement(temperature, humidity, deviceUuid, DateTime.UtcNow);
    }

    public async Task<Measurement> GetLatestMeasurement(string deviceUuid)
    {
      return await _measurementRepository.GetLatestMeasurement(deviceUuid);
    }

    public async Task<IEnumerable<Measurement>> GetMeasurements(string deviceUuid, int hours)
    {
      if (hours > 24 * 31)
        return Enumerable.Empty<Measurement>();
      
      return await _measurementRepository.GetMeasurements(deviceUuid, hours);
    }
  }
}