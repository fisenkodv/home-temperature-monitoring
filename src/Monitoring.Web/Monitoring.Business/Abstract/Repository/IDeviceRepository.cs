using System.Collections.Generic;
using System.Threading.Tasks;
using Monitoring.Business.Model;

namespace Monitoring.Business.Abstract.Repository
{
  public interface IDeviceRepository
  {
    Task<Device> GetByDeviceId(string deviceId);
    Task<IEnumerable<Device>> GetAll();
    Task<int> Create(string deviceId, string name, bool isActive);
  }
}