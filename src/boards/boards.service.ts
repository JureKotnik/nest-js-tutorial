import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { async } from 'rxjs';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
   // private boards: Board[] =[];

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){}

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    // getAllBoards(): Board[]{
    //     return this.boards;
    // }

        async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>{
            const {title, description} = createBoardDto;

            const board = this.boardRepository.create({
                title,
                description,
                status: BoardStatus.PUBLIC,
                user
            })
            await this.boardRepository.save(board);
            return board;
        }

    // createBoard(createBoardDto: CreateBoardDto){

    //     const {title, description } = createBoardDto; 

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board)
    //     return board;
    // }

    async getBoardById(id: number, user: User): Promise<Board> {
        const found = await this.boardRepository
          .createQueryBuilder('board')
          .leftJoin('board.user', 'user')
          .where('board.id = :id', { id })
          .andWhere('user.id = :userId', { userId: user.id })
          .getOne();
      
        if (!found) {
          throw new NotFoundException(`Can't find Board with id: ${id}`);
        }
      
        return found;
      }

    // getBoardById(id: string): Board{
    //     const found = this.boards.find(board => board.id === id);
    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id: ${id}`);
    //     }
    //     return found;
    // }


    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository
          .createQueryBuilder()
          .delete()
          .from(Board)
          .where('id = :id', { id })
          .andWhere('userId = :userId', { userId: user.id })
          .execute();
      
        if (result.affected === 0) {
          throw new NotFoundException(`Can't find Board with id: ${id}`);
        }
      }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter(board => board.id !== found.id);
    // }

    async updateBoardStatus(id:number, status: BoardStatus, user: User): Promise<Board>{
        const board = await this.getBoardById(id, user);
        board.status = status;

        await this.boardRepository.save(board);
        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }


}
