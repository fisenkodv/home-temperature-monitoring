using JetBrains.Annotations;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
  [PublicAPI]
  public class CreateMeasurementDto
  {
    [JsonProperty("device_uuid")]
    public string DeviceUuid { get; set; }

    [JsonProperty("temperature")]
    public float Temperature { get; set; }

    [JsonProperty("humidity")]
    public float Humidity { get; set; }
  }
}