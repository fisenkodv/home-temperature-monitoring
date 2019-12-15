using System;
using JetBrains.Annotations;
using Monitoring.Business.Model;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
    [PublicAPI]
    public class MeasurementDto
    {
        [JsonProperty("deviceUuid")] public string DeviceUuid { get; set; }
        [JsonProperty("temperature")] public double Temperature { get; set; }
        [JsonProperty("humidity")] public double Humidity { get; set; }
        [JsonProperty("heat_index")] public double HeatIndex { get; set; }
        [JsonProperty("time_stamp")] public DateTime TimeStamp { get; set; }

        public static MeasurementDto FromModel(Measurement measurement)
        {
            return measurement != null
                ? new MeasurementDto
                {
                    DeviceUuid = measurement.DeviceUuid,
                    Temperature = measurement.Temperature,
                    Humidity = measurement.Humidity,
                    HeatIndex = TemperatureHelper.GetHeatIndex(measurement.Temperature, measurement.Humidity),
                    TimeStamp = DateTime.SpecifyKind(measurement.TimeStamp, DateTimeKind.Utc)
                }
                : null;
        }
    }
}