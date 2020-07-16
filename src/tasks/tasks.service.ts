import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService 
{
    constructor(

        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    )
    {

    }
    
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>
    {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task>
    {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException();
        }
        
        return task;
    }

    async deleteTaskById(id: number): Promise<void>
    {
        const deleted = await this.taskRepository.delete(id);

        if (deleted.affected) {
            throw new NotFoundException();
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>
    {
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>
    {
        const task = await this.getTaskById(id);

        task.status = status;
        task.save();

        return task;
    }
}
