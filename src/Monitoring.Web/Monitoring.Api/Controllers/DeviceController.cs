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
    public async Task<IEnumerable<DeviceDto>> GetDevices()
    {
      var devices = await _deviceService.GetDevices();
      return devices.Select(DeviceDto.FromModel);
    }

    [HttpGet("{deviceId}")]
    public async Task<DeviceDto> GetDevice(string deviceId)
    {
      var device = await _deviceService.GetDevice(deviceId);
      return DeviceDto.FromModel(device);
    }
  }
}