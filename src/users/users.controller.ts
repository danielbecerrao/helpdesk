import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el listado de usuarios',
    type: User,
    isArray: true,
  })
  get(): Promise<User[]> {
    return this.usersService.get();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
    status: 201,
    description: 'El usuario creado',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({
    status: 200,
    description: 'El usuario actualizado',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiResponse({
    status: 200,
    description: 'El usuario eliminado',
    type: User,
  })
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Get('random')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Usuario aleatorio' })
  @ApiResponse({
    status: 200,
    description: 'Retorna un usuario aleatoriamente',
    type: User,
  })
  getRandom(): Promise<User> {
    return this.usersService.getRandom();
  }
}
