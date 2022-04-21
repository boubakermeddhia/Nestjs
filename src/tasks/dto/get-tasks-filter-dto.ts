import { TaskStatus } from '../Task-status.enum'
import { IsIn, isNotEmpty, IsOptional } from "class-validator";


export class GetTasksFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus

    @IsOptional()
    // @isNotEmpty()
    search: string
}