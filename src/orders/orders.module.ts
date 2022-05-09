import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { OrderSubscriber } from './order.suscriber';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), UsersModule],
  providers: [OrdersService, OrderSubscriber],
  controllers: [OrdersController],
})
export class OrdersModule {}
