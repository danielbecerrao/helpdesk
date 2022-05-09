import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Order } from 'src/orders/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Pablo Perez',
    description: 'Nombre del usuario',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'pablo.perez',
    description: 'Usuario para la autenticación',
  })
  @Column()
  username: string;

  @Column()
  @Exclude()
  salt: string;

  @ApiProperty({
    example: '&%tg&7Hjn.sas4t5',
    description: 'Contraseña para la autenticación',
  })
  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      this.salt = salt;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async lowerCaseUsername() {
    if (this.username) {
      this.username = this.username.toLowerCase();
    }
  }
}
