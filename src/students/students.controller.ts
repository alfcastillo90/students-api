import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { Student } from './entities/student.entity';
import { ApiKeyGuard } from '../guards/api-key/api-key.guard';

@ApiTags('students')
@ApiSecurity('apiKey')
@Controller('students')
@UseGuards(ApiKeyGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Student created successfully.',
    type: Student,
  })
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all students.',
    type: [Student],
  })
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student found.',
    type: Student,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student not found.',
  })
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student updated successfully.',
    type: Student,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<void> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Student deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student not found.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}
