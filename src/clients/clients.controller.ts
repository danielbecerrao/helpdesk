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
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el listado de clientes',
    type: Client,
    isArray: true,
  })
  get(): Promise<Client[]> {
    return this.clientsService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear cliente' })
  @ApiResponse({
    status: 201,
    description: 'El cliente creado',
    type: Client,
  })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar cliente' })
  @ApiResponse({
    status: 200,
    description: 'El cliente actualizado',
    type: Client,
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar cliente' })
  @ApiResponse({
    status: 200,
    description: 'El cliente eliminado',
    type: Client,
  })
  delete(@Param('id') id: string): Promise<Client> {
    return this.clientsService.delete(id);
  }
}
