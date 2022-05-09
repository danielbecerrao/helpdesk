import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async get(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    return clients;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = await this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOne(id);
    const editedClient = Object.assign(client, updateClientDto);
    return await this.clientRepository.save(editedClient);
  }

  async delete(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne(id);
    return await this.clientRepository.softRemove(client);
  }
}
