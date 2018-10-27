using Microsoft.Extensions.DependencyInjection;
using Monitoring.Business.Abstract.Repository;
using Monitoring.Business.Service;
using Monitoring.Data.Repository;

namespace Monitoring.Api.Extensions
{
  public static class ServicesExtensions
  {
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
      services.AddScoped<IDeviceRepository, DeviceRepository>();
      services.AddScoped<ITelemetryRepository, TelemetryRepository>();

      services.AddTransient<DeviceService>();
      services.AddTransient<TelemetryService>();

      return services;
    }
  }
}