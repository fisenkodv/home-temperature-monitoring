import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Telemetry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Device, device => device.telemetry)
  device: Device;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  heat_index: number;

  @Column()
  time_stamp: Date;
}
