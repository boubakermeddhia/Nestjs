import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './Task-status.enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    getTasks(filterTodo: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterTodo, user)

    }

    async getTasksById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } })
        if (!found) {
            throw new NotFoundException()
        }
        return found

    }

    async createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTasks(CreateTaskDto, user)
    }

    async deleteTasksById(id: number, user: User): Promise<any> {
        let found = await this.taskRepository.delete({ id, userId: user.id });
        if (found.affected === 0) throw new NotFoundException()
    }

    async updateTasksById(id: number, status: TaskStatus, user: User): Promise<Task> {
        let tasks = await this.getTasksById(id, user)
        tasks.status = status
        tasks.save()
        return tasks
    }

}
