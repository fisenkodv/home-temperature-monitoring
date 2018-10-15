export class CreateTelemetryDto {
  readonly deviceId: string;
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
}
