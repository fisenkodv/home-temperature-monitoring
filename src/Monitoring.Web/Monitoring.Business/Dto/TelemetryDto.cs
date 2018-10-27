using System;
using JetBrains.Annotations;
using Monitoring.Business.Model;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
  [PublicAPI]
  public class TelemetryDto
  {
    [JsonProperty("online")]
    public bool Online { get; set; }

    [JsonProperty("temperature")]
    public double Temperature { get; set; }

    [JsonProperty("humidity")]
    public double Humidity { get; set; }

    [JsonProperty("heat_index")]
    public double HeatIndex { get; set; }

    public static TelemetryDto FromModel(Telemetry telemetry)
    {
      return telemetry != null
        ? new TelemetryDto
        {
          Online = telemetry.TimeStamp.ToUniversalTime() > DateTime.UtcNow.AddMinutes(-1),
          Temperature = telemetry.Temperature,
          Humidity = telemetry.Humidity,
          HeatIndex = TemperatureHelper.GetHeatIndex(telemetry.Temperature, telemetry.Humidity)
        }
        : default(TelemetryDto);
    }
  }
}