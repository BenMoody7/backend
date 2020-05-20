import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('pass') userPass: string,
  ) {
    const generatedId = await this.usersService.insertUser(userName, userPass);
    return { id: generatedId };
  }

  @Get()
  getUser(@Query('name') name: string, @Query('pass') pass: string) {
    return this.usersService.getSingleUser(name, pass);
  }

  @Post(':update')
  async updateUser(@Query('id') userId: string, @Body('classes') classes: []) {
    return this.usersService.updateUser(userId, classes);
  }

  @Get(':classes')
  async getClasses(@Query('id') userId: string) {
    return this.usersService.getClasses(userId);
  }
}
