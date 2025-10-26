import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto, TodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): TodoDto[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TodoDto {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): TodoDto {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): TodoDto {
    try {
      return this.todoService.update(id, updateTodoDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    try {
      this.todoService.remove(id);
      return { message: 'Todo deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}