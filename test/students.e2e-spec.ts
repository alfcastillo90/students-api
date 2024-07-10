import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateStudentDto } from './../src/students/dto/create-student.dto';
import { UpdateStudentDto } from './../src/students/dto/update-student.dto';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  const apiKey = process.env.API_KEY;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/students (POST)', async () => {
    const createStudentDto: CreateStudentDto = {
      name: 'Test Student',
      email: 'test@student.com',
      birthDate: '2000-01-01T00:00:00.000Z',
      enrollmentDate: '2024-01-01T00:00:00.000Z',
      courses: ['Math', 'Science'],
    };

    const response = await request(app.getHttpServer())
      .post('/students')
      .set('x-api-key', apiKey)
      .send(createStudentDto)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      ...createStudentDto,
    });
  });

  it('/students (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/students')
      .set('x-api-key', apiKey)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/students/:id (GET)', async () => {
    const createStudentDto: CreateStudentDto = {
      name: 'Test Student',
      email: 'test@student.com',
      birthDate: '2000-01-01T00:00:00.000Z',
      enrollmentDate: '2024-01-01T00:00:00.000Z',
      courses: ['Math', 'Science'],
    };

    const createdStudent = await request(app.getHttpServer())
      .post('/students')
      .set('x-api-key', apiKey)
      .send(createStudentDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/students/${createdStudent.body.id}`)
      .set('x-api-key', apiKey)
      .expect(200);

    expect(response.body).toEqual(createdStudent.body);
  });

  it('/students/:id (PUT)', async () => {
    const createStudentDto: CreateStudentDto = {
      name: 'Test Student',
      email: 'test@student.com',
      birthDate: '2000-01-01T00:00:00.000Z',
      enrollmentDate: '2024-01-01T00:00:00.000Z',
      courses: ['Math', 'Science'],
    };

    const updateStudentDto: UpdateStudentDto = {
      name: 'Test Student',
      email: 'test@student.com',
      birthDate: '2000-01-01T00:00:00.000Z',
      enrollmentDate: '2024-01-01T00:00:00.000Z',
      courses: ['Math', 'Science'],
    };

    const createdStudent = await request(app.getHttpServer())
      .post('/students')
      .set('x-api-key', apiKey)
      .send(createStudentDto)
      .expect(201);

    await request(app.getHttpServer())
      .put(`/students/${createdStudent.body.id}`)
      .set('x-api-key', apiKey)
      .send(updateStudentDto)
      .expect(200);

    const response = await request(app.getHttpServer())
      .get(`/students/${createdStudent.body.id}`)
      .set('x-api-key', apiKey)
      .expect(200);

    expect(response.body).toEqual({
      id: createdStudent.body.id,
      ...updateStudentDto,
    });
  });

  it('/students/:id (DELETE)', async () => {
    const createStudentDto: CreateStudentDto = {
      name: 'Test Student',
      email: 'test@student.com',
      birthDate: '2000-01-01T00:00:00.000Z',
      enrollmentDate: '2024-01-01T00:00:00.000Z',
      courses: ['Math', 'Science'],
    };

    const createdStudent = await request(app.getHttpServer())
      .post('/students')
      .set('x-api-key', apiKey)
      .send(createStudentDto)
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/students/${createdStudent.body.id}`)
      .set('x-api-key', apiKey)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/students/${createdStudent.body.id}`)
      .set('x-api-key', apiKey)
      .expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
