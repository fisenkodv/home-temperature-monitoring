using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Monitoring.Api.Extensions;

namespace Monitoring.Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddMemoryCache();
            services.AddCustomServices();
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "wwwroot/");
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseRouting();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot";
                if (env.IsDevelopment()) spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
            });
        }
    }
}