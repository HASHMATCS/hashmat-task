import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrganizationEntity } from '../organization/organization.entity';
import { AddressEntity } from '../address/address.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  shift: string;

  @Column()
  hasProjector: boolean;

  @Column()
  hasLaptop: boolean;

  @ManyToOne(() => AddressEntity)
  address: AddressEntity;

  @ManyToOne(() => OrganizationEntity)
  organization: OrganizationEntity;
}
