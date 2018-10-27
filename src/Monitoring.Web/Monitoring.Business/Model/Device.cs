namespace Monitoring.Business.Model
{
  public class Device
  {
    public int Id { get; set; }
    public string Uuid { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
  }
}