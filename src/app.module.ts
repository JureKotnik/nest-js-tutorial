import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsService } from './boards/boards.service';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule
  ],
  
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
  

})
export class AppModule {}
