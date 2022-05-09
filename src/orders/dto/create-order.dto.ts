import { IsNotEmpty } from 'class-validator';
import { Client } from 'src/clients/client.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  client: Client;

  @IsNotEmpty()
  @ApiProperty()
  observation: string;
}
