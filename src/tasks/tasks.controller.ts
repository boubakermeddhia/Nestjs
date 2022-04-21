import { Body, Query, Controller, Get, Post, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity'
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './Task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import GetUser from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe)
        filterDto: GetTasksFilterDto,
        @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTasksById(@Param('id', ParseIntPipe) id: number,
        @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTasksById(id, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTasks(CreateTaskDto, user)
    }

    @Delete('/:id')
    deleteTasksById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User): Promise<Task> {
        return this.tasksService.deleteTasksById(id,user)
    }

    @Patch('/:id/')
    updateTasksById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTasksById(id, status, user)
    }

}
