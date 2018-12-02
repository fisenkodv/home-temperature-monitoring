using System;
using System.IO;
using JetBrains.Annotations;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace Monitoring.Api
{
  [UsedImplicitly]
  public class Program
  {
    public static int Main(string[] args)
    {
      var currentEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
      var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
        .AddJsonFile($"appsettings.{currentEnv}.json", optional: true, reloadOnChange: false)
        .AddEnvironmentVariables()
        .Build();

      Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .CreateLogger();
      try
      {
        Log.Information("Starting Monitoring Web Api Host");
        CreateWebHostBuilder(args).Build().Run();

        return 0;
      }
      catch (Exception ex)
      {
        Log.Fatal(ex, "Host terminated unexpectedly");
        return 1;
      }
      finally
      {
        Log.CloseAndFlush();
      }
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("hosting.json", optional: true)
        .AddCommandLine(args)
        .Build();

      return WebHost.CreateDefaultBuilder(args)
        .UseUrls("http://*:5000")
        .UseConfiguration(config)
        .UseStartup<Startup>()
        .UseSerilog();
    }
  }
}