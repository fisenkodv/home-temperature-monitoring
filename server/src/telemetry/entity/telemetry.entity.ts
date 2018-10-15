import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Telemetry {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(type => Device, device => device.telemetry, { nullable: false })
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column({ name: 'temperature' })
  temperature: number;

  @Column({ name: 'humidity' })
  humidity: number;

  @Column({ name: 'heat_index' })
  heatIndex: number;

  @Column({ name: 'time_stamp' })
  timeStamp: Date;
}
