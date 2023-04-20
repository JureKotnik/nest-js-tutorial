import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';


@Module({
    imports:[
        TypeOrmModule.forFeature([BoardRepository])
    ],
    controllers: [ BoardsController ],
    providers: [BoardsService]
})


export class BoardsModule {}
