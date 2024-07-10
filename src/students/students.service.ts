import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';
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
    await this.dynamoDB
      .put({
        TableName: this.studentsTable,
        Item: createStudentDto,
      })
      .promise();
    return createStudentDto;
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
