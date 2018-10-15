import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Telemetry } from './telemetry.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  uuid: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  isActive: boolean;

  @OneToMany(type => Telemetry, telemetry => telemetry.device)
  telemetry: Telemetry[];
}
