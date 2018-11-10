export class LoadDevices {
  static readonly type = '[device] load devices';
  constructor() {}
}

export class LoadDevice {
  static readonly type = '[device] load device';
  constructor(public deviceUuid: string) {}
}

export class LoadMeasurement {
  static readonly type = '[device] load measurement';
  constructor() {}
}

export class LoadMeasurements {
  static readonly type = '[device] load measurements';
  constructor(public deviceUuid: string, public hours: number) {}
}
