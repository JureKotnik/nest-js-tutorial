import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports:[
        AuthModule,
        TypeOrmModule.forFeature([BoardRepository])
    ],
    controllers: [ BoardsController ],
    providers: [BoardsService]
})


export class BoardsModule {}
