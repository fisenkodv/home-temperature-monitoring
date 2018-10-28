using System.Collections.Generic;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Model;

namespace Monitoring.Business.Service
{
  [UsedImplicitly]
  public class DeviceService
  {
    private readonly IDeviceRepository _deviceRepository;

    public DeviceService(IDeviceRepository deviceRepository)
    {
      _deviceRepository = deviceRepository;
    }

    public Task<Device> GetDevice(string deviceUuid)
    {
      return _deviceRepository.GetDevice(deviceUuid);
    }

    public Task<IEnumerable<Device>> GetDevices()
    {
      return _deviceRepository.GetDevices();
    }
  }
}