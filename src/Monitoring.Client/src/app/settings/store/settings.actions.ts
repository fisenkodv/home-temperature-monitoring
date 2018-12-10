import { Device } from '@app/shared/models';

export class LoadSettings {
  static readonly type = '[settings] load settings';
  constructor() {}
}

export class SaveSettings {
  static readonly type = '[settings] save settings';
  constructor(public devices: Device[]) {}
}
