import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Return all students.' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiResponse({ status: 200, description: 'Return the student.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiResponse({
    status: 200,
    description: 'The student has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
