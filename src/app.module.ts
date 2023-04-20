import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';


@Module({
  
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ],
  
  controllers: [BoardsController],

})
export class AppModule {}
