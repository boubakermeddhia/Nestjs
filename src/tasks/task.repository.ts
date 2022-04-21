import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './Task-status.enum';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterTodo: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { search, status } = filterTodo
        const query = this.createQueryBuilder('task')
        query.where('task.userId=:userId', { userId: user.id })
        if (status) {
            query.andWhere('task.status=:status', { status })
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
        }
        const tasks = await query.getMany()
        return tasks
    }

    async createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = CreateTaskDto
        const tasks = new Task();
        tasks.title = title;
        tasks.description = description;
        tasks.status = TaskStatus.OPEN;
        tasks.user = user;
        await tasks.save();
        delete tasks.user;
        return tasks;
    }

}