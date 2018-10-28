using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Monitoring.Business.Dto;
using Monitoring.Business.Service;

namespace Monitoring.Api.Controllers
{
  [Route("api/telemetry")]
  public class TelemetryController : Controller
  {
    private readonly TelemetryService _telemetryService;

    public TelemetryController(TelemetryService telemetryService)
    {
      _telemetryService = telemetryService;
    }

    public Task Create([FromBody] CreateTelemetryDto dto)
    {
      return _telemetryService.LogTelemetry(dto.DeviceUuid, dto.Temperature, dto.Humidity);
    }

    [HttpGet("{deviceId}")]
    public async Task<TelemetryDto> Get(string deviceId)
    {
      var telemetry = await _telemetryService.GetTelemetry(deviceId);
      return TelemetryDto.FromModel(telemetry);
    }
  }
}