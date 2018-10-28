using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Monitoring.Business.Dto;
using Monitoring.Business.Service;

namespace Monitoring.Api.Controllers
{
  [Route("api/measurements")]
  public class MeasurementController : Controller
  {
    private readonly MeasurementService _measurementService;

    public MeasurementController(MeasurementService measurementService)
    {
      _measurementService = measurementService;
    }

    [HttpPost]
    public Task Create([FromBody] CreateMeasurementDto dto)
    {
      return _measurementService.CreateMeasurement(dto.DeviceUuid, dto.Temperature, dto.Humidity);
    }

    [HttpGet("{deviceUuid}")]
    public async Task<MeasurementDto> GetLatestMeasurement(string deviceUuid)
    {
      var telemetry = await _measurementService.GetLatestMeasurement(deviceUuid);
      return MeasurementDto.FromModel(telemetry);
    }
  }
}