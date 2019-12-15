using JetBrains.Annotations;
using Monitoring.Business.Model;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
    [PublicAPI]
    public class DeviceDto
    {
        [JsonProperty("uuid")] public string Uuid { get; set; }

        [JsonProperty("name")] public string Name { get; set; }

        [JsonProperty("is_active")] public bool IsActive { get; set; }

        public static DeviceDto FromModel(Device device)
        {
            return device != null
                ? new DeviceDto {Uuid = device.Uuid, Name = device.Name, IsActive = device.IsActive}
                : default;
        }

        public Device ToModel()
        {
            return new Device {IsActive = IsActive, Name = Name, Uuid = Uuid};
        }
    }
}