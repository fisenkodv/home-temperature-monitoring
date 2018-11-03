export interface MeasurementDto {
  readonly temperature: number;
  readonly humidity: number;
  readonly heat_index: number;
  readonly time_stamp: Date;
}
