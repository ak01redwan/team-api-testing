import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(name: string, email: string, password: string): User {
    const id = Math.random().toString(36).slice(2, 10);
    const user = new User(id, name, email, password);
    this.users.push(user);
    return user;
  }

  getAll() {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.getUserById(id);
    if (!user) {
      return;
    }
    Object.assign(user, updates);
    return user;
  }

  deleteUser(id: string): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return;
    }
    const [user] = this.users.splice(index, 1);
    return user;
  }
}