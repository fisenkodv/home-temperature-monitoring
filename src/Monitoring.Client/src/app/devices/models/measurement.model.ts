export interface MeasurementDto {
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
  readonly timeStamp: Date;
}

export class Measurement {
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
  readonly timeStamp: Date;

  static fromDto(dto: MeasurementDto): Measurement {
    return {
      temperature: dto.temperature,
      humidity: dto.humidity,
      heatIndex: dto.heatIndex,
      timeStamp: dto.timeStamp,
    };
  }
}
