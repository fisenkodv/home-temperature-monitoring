using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Business.Service
{
  [UsedImplicitly]
  public class TelemetryService
  {
    private readonly ITelemetryRepository _telemetryRepository;
    private readonly IDeviceRepository _deviceRepository;

    public TelemetryService(ITelemetryRepository telemetryRepository, IDeviceRepository deviceRepository)
    {
      _telemetryRepository = telemetryRepository;
      _deviceRepository = deviceRepository;
    }

    public async Task LogTelemetry(string deviceId, float temperature, float humidity)
    {
      var device = await _deviceRepository.GetByDeviceId(deviceId);
      if (device == null)
      {
        var id = await _deviceRepository.Create(deviceId, "unknown device", true);
        device = new Device {Id = id};
      }

      await _telemetryRepository.Create(temperature, humidity, device.Id, DateTime.UtcNow);
    }

    public async Task<Telemetry> GetTelemetry(string deviceId)
    {
      return await _telemetryRepository.GetLatestTelemetry(deviceId);
    }
  }
}