using Microsoft.Extensions.DependencyInjection;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Service;
using Monitoring.Data.Repository;

namespace Monitoring.Api.Extensions
{
  public static class ServicesExtensions
  {
    public static void AddCustomServices(this IServiceCollection services)
    {
      services.AddTransient<IDeviceRepository, DeviceRepository>();
      services.AddTransient<IMeasurementRepository, MeasurementRepository>();

      services.AddTransient<DeviceService>();
      services.AddTransient<MeasurementService>();
    }
  }
}