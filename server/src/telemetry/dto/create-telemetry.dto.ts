export class CreateTelemetryDto {
  readonly deviceUuid: string;
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
}
