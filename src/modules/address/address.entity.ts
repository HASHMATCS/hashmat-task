import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  town: string;

  @Column()
  tehsil: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}