using JetBrains.Annotations;
using Monitoring.Business.Model;
using Newtonsoft.Json;

namespace Monitoring.Business.Dto
{
  [PublicAPI]
  public class DeviceDto
  {
    [JsonProperty("uuid")]
    public string Uuid { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    public static DeviceDto FromModel(Device device)
    {
      return device != null ? new DeviceDto {Uuid = device.Uuid, Name = device.Name} : default(DeviceDto);
    }
  }
}