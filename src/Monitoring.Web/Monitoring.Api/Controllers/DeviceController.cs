using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Monitoring.Business.Dto;
using Monitoring.Business.Service;

namespace Monitoring.Api.Controllers
{
  [Route("api/devices")]
  public class DeviceController : Controller
  {
    private readonly DeviceService _deviceService;

    public DeviceController(DeviceService deviceService)
    {
      _deviceService = deviceService;
    }

    [HttpGet]
    public async Task<IEnumerable<DeviceDto>> GetDevices(bool active)
    {
      var devices = await _deviceService.GetDevices(active);
      return devices.Select(DeviceDto.FromModel);
    }

    [HttpGet("{deviceUuid}")]
    public async Task<DeviceDto> GetDevice(string deviceUuid)
    {
      var device = await _deviceService.GetDevice(deviceUuid);
      return DeviceDto.FromModel(device);
    }
  }
}