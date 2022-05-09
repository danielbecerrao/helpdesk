import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username: username.toLowerCase() })
      .getOne();
    return user;
  }

  async get(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const editedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editedUser);
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return await this.userRepository.softRemove(user);
  }

  async getRandom(): Promise<User> {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .orderBy('random()')
      .getOne();
    return users;
  }
}
