export class CreateTelemetry {
  readonly deviceUuid: string;
  readonly temperature: number;
  readonly humidity: number;
}

export class DeviceTelemetry {
  readonly online: boolean;
  readonly temperature: number;
  readonly humidity: number;
  readonly heatIndex: number;
}
