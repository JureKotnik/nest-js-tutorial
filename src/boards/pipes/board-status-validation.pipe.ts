import { BadRequestException, PipeTransform } from "@nestjs/common"
import { BoardStatus } from "../board.model"

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOption = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    transform(value, metadata){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`)
        }
    }

    private isStatusValid(status: any){
        const index = this.StatusOption.indexOf(status);
        return index !== -1;
    }
}