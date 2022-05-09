import { Order } from 'src/orders/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({
    example: '1087112345',
    description: 'Número de documento del cliente',
  })
  document: string;

  @Column()
  @ApiProperty({
    example: 'Andrés',
    description: 'Nombre del cliente',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Calle 34 76-89',
    description: 'Direción del cliente',
  })
  address: string;

  @Column()
  @ApiProperty({
    example: '3141234567',
    description: 'Número de teléfono del cliente',
  })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
