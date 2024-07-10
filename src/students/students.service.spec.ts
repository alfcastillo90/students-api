import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { StudentsService } from './students.service';
import { DynamoDB } from 'aws-sdk';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

jest.mock('aws-sdk', () => {
  const mDocumentClient = {
    put: jest.fn().mockReturnThis(),
    scan: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mDocumentClient),
    },
  };
});

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'unique-id'),
}));

describe('StudentsService', () => {
  let service: StudentsService;
  let dynamoDB: DynamoDB.DocumentClient;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: 'DYNAMODB',
          useFactory: () => new DynamoDB.DocumentClient(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('students-table'),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    dynamoDB = module.get<DynamoDB.DocumentClient>('DYNAMODB');
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Test Student',
        email: 'test@student.com',
        birthDate: '2000-01-01T00:00:00.000Z',
        enrollmentDate: '2024-01-01T00:00:00.000Z',
        courses: ['Math', 'Science'],
      };
      const student: Student = {
        id: 'unique-id',
        ...createStudentDto,
      };
      (
        dynamoDB.put({ TableName: 'students-table', Item: student })
          .promise as jest.Mock
      ).mockResolvedValue({});

      const result = await service.create(createStudentDto);
      expect(result).toEqual(student);
      expect(dynamoDB.put).toHaveBeenCalledWith({
        TableName: 'students-table',
        Item: student,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students: Student[] = [
        {
          id: '1',
          name: 'Student 1',
          email: 'student1@test.com',
          birthDate: '2000-01-01T00:00:00.000Z',
          enrollmentDate: '2024-01-01T00:00:00.000Z',
          courses: ['Math', 'Science'],
        },
      ];
      (
        dynamoDB.scan({ TableName: 'students-table' }).promise as jest.Mock
      ).mockResolvedValue({
        Items: students,
      });

      const result = await service.findAll();
      expect(result).toEqual(students);
      expect(dynamoDB.scan).toHaveBeenCalledWith({
        TableName: 'students-table',
      });
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const student: Student = {
        id: '1',
        name: 'Student 1',
        email: 'student1@test.com',
        birthDate: '2000-01-01T00:00:00.000Z',
        enrollmentDate: '2024-01-01T00:00:00.000Z',
        courses: ['Math', 'Science'],
      };
      (
        dynamoDB.get({ TableName: 'students-table', Key: { id: '1' } })
          .promise as jest.Mock
      ).mockResolvedValue({
        Item: student,
      });

      const result = await service.findOne('1');
      expect(result).toEqual(student);
      expect(dynamoDB.get).toHaveBeenCalledWith({
        TableName: 'students-table',
        Key: { id: '1' },
      });
    });

    it('should throw a NotFoundException if student is not found', async () => {
      (
        dynamoDB.get({ TableName: 'students-table', Key: { id: '1' } })
          .promise as jest.Mock
      ).mockResolvedValue({});

      await expect(service.findOne('1')).rejects.toThrow(
        `Student with ID "1" not found`,
      );
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateStudentDto: Partial<CreateStudentDto> = {
        name: 'Updated Student',
        email: 'updated@student.com',
        birthDate: '1999-01-01T00:00:00.000Z',
        enrollmentDate: '2023-01-01T00:00:00.000Z',
        courses: ['History', 'Math'],
      };
      (
        dynamoDB.update({
          TableName: 'students-table',
          Key: { id: '1' },
          UpdateExpression:
            'set #name = :name, #email = :email, #birthDate = :birthDate, #enrollmentDate = :enrollmentDate, #courses = :courses',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
            '#birthDate': 'birthDate',
            '#enrollmentDate': 'enrollmentDate',
            '#courses': 'courses',
          },
          ExpressionAttributeValues: {
            ':name': updateStudentDto.name,
            ':email': updateStudentDto.email,
            ':birthDate': updateStudentDto.birthDate,
            ':enrollmentDate': updateStudentDto.enrollmentDate,
            ':courses': updateStudentDto.courses,
          },
        }).promise as jest.Mock
      ).mockResolvedValue({});

      await service.update('1', updateStudentDto);
      expect(dynamoDB.update).toHaveBeenCalledWith({
        TableName: 'students-table',
        Key: { id: '1' },
        UpdateExpression:
          'set #name = :name, #email = :email, #birthDate = :birthDate, #enrollmentDate = :enrollmentDate, #courses = :courses',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
          '#birthDate': 'birthDate',
          '#enrollmentDate': 'enrollmentDate',
          '#courses': 'courses',
        },
        ExpressionAttributeValues: {
          ':name': updateStudentDto.name,
          ':email': updateStudentDto.email,
          ':birthDate': updateStudentDto.birthDate,
          ':enrollmentDate': updateStudentDto.enrollmentDate,
          ':courses': updateStudentDto.courses,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      (
        dynamoDB.delete({
          TableName: 'students-table',
          Key: {},
        }).promise as jest.Mock
      ).mockResolvedValue({});

      await service.remove('1');
      expect(dynamoDB.delete).toHaveBeenCalledWith({
        TableName: 'students-table',
        Key: { id: '1' },
      });
    });
  });
});
