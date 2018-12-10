export class DeviceDto {
  uuid: string;
  name: string;
  is_active: boolean;

  static fromModel(dto: Device): DeviceDto {
    return {
      uuid: dto.uuid,
      name: dto.name,
      is_active: dto.isActive,
    };
  }
}

export class Device {
  uuid: string;
  name: string;
  isActive: boolean;

  static fromDto(dto: DeviceDto): Device {
    return {
      uuid: dto.uuid,
      name: dto.name,
      isActive: dto.is_active,
    };
  }
}
