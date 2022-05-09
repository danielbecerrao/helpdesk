import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable({ scope: Scope.REQUEST })
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @Inject(REQUEST)
    private request: Request,
  ) {}

  async get(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orders = await this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(orders);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    const editedOrder = Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(editedOrder);
  }

  async delete(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    return await this.orderRepository.softRemove(order);
  }

  async myOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { user: this.request.user },
      relations: ['client'],
    });
    return orders;
  }
}
