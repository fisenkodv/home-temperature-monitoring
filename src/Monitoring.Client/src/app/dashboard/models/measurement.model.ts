import { MeasurementDto } from '../services/dto';

export class Measurement {
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
  readonly timeStamp: Date;

  static fromDto(dto: MeasurementDto): Measurement {
    return {
      temperature: dto.temperature,
      humidity: dto.humidity,
      heatIndex: dto.heat_index,
      timeStamp: dto.time_stamp,
    };
  }
}
