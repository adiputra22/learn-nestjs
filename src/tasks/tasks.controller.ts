import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>
    {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>
    {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void>
    {
        return this.taskService.deleteTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> 
    {
        return this.taskService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task>
    {
        return this.taskService.updateTaskStatus(id, status);
    }
}
