export interface DeviceDto {
  uuid: string;
  name: string;
  is_active: boolean;
}

export class Device {
  uuid: string;
  name: string;
  isActive: boolean;

  static fromDto(dto: DeviceDto): Device {
    return {
      uuid: dto.uuid,
      name: dto.name,
      isActive: dto.is_active
    };
  }
}
