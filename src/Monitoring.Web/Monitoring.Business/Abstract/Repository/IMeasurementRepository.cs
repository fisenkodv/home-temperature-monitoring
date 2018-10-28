using System;
using System.Threading.Tasks;
using Monitoring.Business.Model;

namespace Monitoring.Business.Abstract.Repository
{
  public interface IMeasurementRepository
  {
    Task CreateMeasurement(float temperature, float humidity, string deviceUuid, DateTime utcNow);
    Task<Measurement> GetLatestMeasurement(string deviceUuid);
  }
}