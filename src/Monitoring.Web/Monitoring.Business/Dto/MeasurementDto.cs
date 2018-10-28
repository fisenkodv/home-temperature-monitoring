using JetBrains.Annotations;
using Monitoring.Business.Model;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
  [PublicAPI]
  public class MeasurementDto
  {
    [JsonProperty("temperature")]
    public double Temperature { get; set; }

    [JsonProperty("humidity")]
    public double Humidity { get; set; }

    [JsonProperty("heat_index")]
    public double HeatIndex { get; set; }

    public static MeasurementDto FromModel(Telemetry telemetry)
    {
      return telemetry != null
        ? new MeasurementDto
        {
          Temperature = telemetry.Temperature,
          Humidity = telemetry.Humidity,
          HeatIndex = TemperatureHelper.GetHeatIndex(telemetry.Temperature, telemetry.Humidity)
        }
        : null;
    }
  }
}