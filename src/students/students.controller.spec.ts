import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { ApiKeyGuard } from '../guards/api-key/api-key.guard';

describe('StudentsController', () => {
  let studentsController: StudentsController;
  let studentsService: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [StudentsController],
      providers: [
        ConfigService,
        ApiKeyGuard,
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn().mockResolvedValue({} as Student),
            findAll: jest.fn().mockResolvedValue([] as Student[]),
            findOne: jest.fn().mockResolvedValue({} as Student),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    studentsController = module.get<StudentsController>(StudentsController);
    studentsService = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(studentsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Test Student',
        email: 'student@test.com',
      };
      const result: Student = {
        id: '1',
        ...createStudentDto,
      };
      jest.spyOn(studentsService, 'create').mockResolvedValue(result);

      expect(await studentsController.create(createStudentDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result: Student[] = [
        {
          id: '1',
          name: 'Test Student',
          email: 'student@test.com',
        },
      ];
      jest.spyOn(studentsService, 'findAll').mockResolvedValue(result);

      expect(await studentsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const result: Student = {
        id: '1',
        name: 'Test Student',
        email: 'student@test.com',
      };
      jest.spyOn(studentsService, 'findOne').mockResolvedValue(result);

      expect(await studentsController.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateStudentDto: UpdateStudentDto = {
        name: 'Updated Student',
        email: 'student@test.com',
      };
      jest.spyOn(studentsService, 'update').mockResolvedValue(undefined);

      await studentsController.update('1', updateStudentDto);
      expect(studentsService.update).toHaveBeenCalledWith(
        '1',
        updateStudentDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      jest.spyOn(studentsService, 'remove').mockResolvedValue(undefined);

      await studentsController.remove('1');
      expect(studentsService.remove).toHaveBeenCalledWith('1');
    });
  });
});
