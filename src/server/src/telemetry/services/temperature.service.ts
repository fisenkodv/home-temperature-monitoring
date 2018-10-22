import { Injectable } from '@nestjs/common';

@Injectable()
export class TemperatureService {
  public getHeatIndex(humidity: number, temperature: number): number {
    // https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
    const temperatureInFahrenheit = this.toFahrenheit(temperature);
    let heatIndex =
      -42.379 +
      2.04901523 * temperatureInFahrenheit +
      10.14333127 * humidity -
      0.22475541 * temperatureInFahrenheit * humidity -
      0.00683783 * temperatureInFahrenheit * temperatureInFahrenheit -
      0.05481717 * humidity * humidity +
      0.00122874 * temperatureInFahrenheit * temperatureInFahrenheit * humidity +
      0.00085282 * temperatureInFahrenheit * humidity * humidity -
      0.00000199 * temperatureInFahrenheit * temperatureInFahrenheit * humidity * humidity;

    if (humidity < 13 && (temperatureInFahrenheit > 80 && temperatureInFahrenheit < 112)) {
      const adjustment = ((13 - humidity) / 4) * Math.sqrt((17 - Math.abs(temperatureInFahrenheit - 95)) / 17);
      heatIndex -= adjustment;
    }
    if (humidity > 85 && (temperatureInFahrenheit > 80 && temperatureInFahrenheit < 87)) {
      const adjustment = ((humidity - 85) / 10) * ((87 - temperatureInFahrenheit) / 5);
      heatIndex += adjustment;
    }

    return this.toCelsius(heatIndex);
  }

  private toFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  private toCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  }
}
