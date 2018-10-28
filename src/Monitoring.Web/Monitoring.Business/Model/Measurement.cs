using System;

namespace Monitoring.Business.Model
{
  public class Measurement
  {
    public double Humidity { get; set; }
    public double Temperature { get; set; }
    public DateTime TimeStamp { get; set; }
  }
}