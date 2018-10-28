using System.Collections.Generic;
using System.Threading.Tasks;
using Monitoring.Business.Model;

namespace Monitoring.Business.Abstract.Repository
{
  public interface IDeviceRepository
  {
    Task<IEnumerable<Device>> GetDevices();
    Task<Device> GetDevice(string deviceUuid);
    Task<int> CreateDevice(string deviceUuid, string name, bool isActive);
  }
}