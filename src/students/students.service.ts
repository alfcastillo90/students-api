import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private readonly studentsTable: string;

  constructor(
    @Inject('DYNAMODB') private readonly dynamoDB: DynamoDB.DocumentClient,
    private readonly configService: ConfigService,
  ) {
    this.studentsTable = this.configService.get<string>('STUDENTS_TABLE');
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student: Student = {
      id: uuidv4(),
      ...createStudentDto,
    };

    await this.dynamoDB
      .put({
        TableName: this.studentsTable,
        Item: student,
      })
      .promise();
    return student;
  }

  async findAll(): Promise<Student[]> {
    const result = await this.dynamoDB
      .scan({
        TableName: this.studentsTable,
      })
      .promise();
    return result.Items as Student[];
  }

  async findOne(id: string): Promise<Student> {
    const result = await this.dynamoDB
      .get({
        TableName: this.studentsTable,
        Key: { id },
      })
      .promise();

    if (!result.Item) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    return result.Item as Student;
  }

  async update(
    id: string,
    updateStudentDto: Partial<CreateStudentDto>,
  ): Promise<void> {
    await this.dynamoDB
      .update({
        TableName: this.studentsTable,
        Key: { id },
        UpdateExpression: 'set #name = :name, #email = :email',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':name': updateStudentDto.name,
          ':email': updateStudentDto.email,
        },
      })
      .promise();
  }

  async remove(id: string): Promise<void> {
    await this.dynamoDB
      .delete({
        TableName: this.studentsTable,
        Key: { id },
      })
      .promise();
  }
}
