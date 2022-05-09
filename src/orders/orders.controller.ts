import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar órdenes' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el listado de órdenes',
    type: Order,
    isArray: true,
  })
  get(): Promise<Order[]> {
    return this.ordersService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear orden' })
  @ApiResponse({
    status: 201,
    description: 'La orden creada',
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar orden' })
  @ApiResponse({
    status: 200,
    description: 'La orden actualizada',
    type: Order,
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar orden' })
  @ApiResponse({
    status: 200,
    description: 'La orden eliminada',
    type: Order,
  })
  delete(@Param('id') id: string): Promise<Order> {
    return this.ordersService.delete(id);
  }

  @Get('myorders')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar órdenes del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el listado de órdenes',
    type: Order,
    isArray: true,
  })
  myOrders(): Promise<Order[]> {
    return this.ordersService.myOrders();
  }
}
