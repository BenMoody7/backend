import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dummyuser:12345@cluster0-0vvr2.mongodb.net/backenddb?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
