using System;
using System.Threading.Tasks;
using Monitoring.Business.Model;

namespace Monitoring.Business.Abstract.Repository
{
  public interface ITelemetryRepository
  {
    Task Create(float temperature, float humidity, int deviceId, DateTime utcNow);
    Task<Telemetry> GetLatestTelemetry(string deviceId);
  }
}