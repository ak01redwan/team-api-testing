import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: { name: string; email: string; password: string }): User {
    const { name, email, password } = body;
    return this.userService.createUser(name, email, password);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updates: Partial<User>): User {
    const user = this.userService.updateUser(id, updates);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    const user = this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }
}