using System;

namespace Monitoring.Business.Model
{
  public class Telemetry
  {
    public int Id { get; set; }
    public double Humidity { get; set; }
    public double Temperature { get; set; }
    public DateTime TimeStamp { get; set; }
  }
}