using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Monitoring.Business.Dto;
using Monitoring.Business.Model;
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

    [HttpGet("{deviceUuid}/{hours}")]
    public async Task<IEnumerable<MeasurementDto>> GetMeasurements(string deviceUuid, MeasurementType measurementType)
    {
      var measurements = await _measurementService.GetMeasurements(deviceUuid, measurementType);
      return measurements.Select(MeasurementDto.FromModel);
    }

    [HttpGet("{deviceUuid}")]
    public async Task<MeasurementDto> GetLatestMeasurement(string deviceUuid)
    {
      var measurement = await _measurementService.GetLatestMeasurement(deviceUuid);
      return MeasurementDto.FromModel(measurement);
    }
  }
}