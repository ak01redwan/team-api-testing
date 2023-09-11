
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
