using System.Collections.Generic;
using System.Threading.Tasks;
using Monitoring.Business.Model;

namespace Monitoring.Business.Abstract.Repository
{
    public interface IMeasurementRepository
    {
        Task CreateMeasurements(IEnumerable<Measurement> measurements);
        Task<Measurement> GetLatestMeasurement(string deviceUuid);
        Task<IEnumerable<Measurement>> GetMeasurements(string deviceUuid, int hours);
    }
}