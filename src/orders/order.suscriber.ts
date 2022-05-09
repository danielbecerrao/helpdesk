import { UsersService } from 'src/users/users.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Order } from './order.entity';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  constructor(connection: Connection, private usersService: UsersService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Order;
  }

  async beforeInsert(event: InsertEvent<Order>) {
    event.entity.user = await this.usersService.getRandom();
  }
}
