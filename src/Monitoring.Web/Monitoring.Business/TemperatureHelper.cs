using System;

namespace Monitoring.Business
{
  internal static class TemperatureHelper
  {
    public static double GetHeatIndex(double temperature, double humidity)
    {
      // https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
      var temperatureInFahrenheit = ToFahrenheit(temperature);
      var heatIndex =
        -42.379 +
        2.04901523 * temperatureInFahrenheit +
        10.14333127 * humidity -
        0.22475541 * temperatureInFahrenheit * humidity -
        0.00683783 * temperatureInFahrenheit * temperatureInFahrenheit -
        0.05481717 * humidity * humidity +
        0.00122874 * temperatureInFahrenheit * temperatureInFahrenheit * humidity +
        0.00085282 * temperatureInFahrenheit * humidity * humidity -
        0.00000199 * temperatureInFahrenheit * temperatureInFahrenheit * humidity * humidity;

      if (humidity < 13 && temperatureInFahrenheit > 80 && temperatureInFahrenheit < 112)
      {
        var adjustment  = (13 - humidity) / 4.0 * Math.Sqrt((17 - Math.Abs(temperatureInFahrenheit - 95)) / 17.0);
        heatIndex -= adjustment;
      }

      if (humidity > 85 && temperatureInFahrenheit > 80 && temperatureInFahrenheit < 87)
      {
        var adjustment  = (humidity - 85) / 10.0 * ((87 - temperatureInFahrenheit) / 5.0);
        heatIndex += adjustment;
      }

      return ToCelsius(heatIndex);
    }

    private static double ToFahrenheit(double celsius)
    {
      return celsius * 9.0 / 5.0 + 32;
    }

    private static double ToCelsius(double fahrenheit)
    {
      return (fahrenheit - 32) * 5.0 / 9.0;
    }
  }
}