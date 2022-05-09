import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  @ApiProperty({
    example: '0859ae71-868d-47ec-807f-4b35e34bf7b2',
    description: 'Token de la orden',
  })
  token: string;

  @Column()
  @ApiProperty({
    example: 'Instalación para las 9 am',
    description: 'Descripción de la orden',
  })
  observation: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'RESTRICT',
  })
  user: User;

  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'RESTRICT',
  })
  @ApiProperty({
    example: '4b974a93-d5bf-46ef-9523-e44e3a9078df',
    description: 'Uuid del cliente',
  })
  client: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
