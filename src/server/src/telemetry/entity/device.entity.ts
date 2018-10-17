import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Telemetry } from './telemetry.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 8 })
  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ length: 100 })
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToMany(type => Telemetry, telemetry => telemetry.device)
  telemetry: Telemetry[];
}
