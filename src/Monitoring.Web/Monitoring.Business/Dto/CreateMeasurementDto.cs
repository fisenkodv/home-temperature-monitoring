using System.Text.Json.Serialization;
using JetBrains.Annotations;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
    [PublicAPI]
    public class CreateMeasurementDto
    {
        [JsonPropertyName("device_uuid")]
        [JsonProperty("device_uuid")]
        public string DeviceUuid { get; set; }

        [JsonPropertyName("temperature")]
        [JsonProperty("temperature")]
        public float Temperature { get; set; }

        [JsonPropertyName("humidity")]
        [JsonProperty("humidity")]
        public float Humidity { get; set; }
    }
}