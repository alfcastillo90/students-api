import { ApiProperty } from '@nestjs/swagger';

export class Student {
  @ApiProperty({ example: '123', description: 'The ID of the student' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the student',
  })
  email: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00.000Z',
    description: 'The birth date of the student',
  })
  birthDate: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The enrollment date of the student',
  })
  enrollmentDate: string;

  @ApiProperty({
    example: ['Math', 'Science'],
    description: 'The courses the student is enrolled in',
  })
  courses: string[];
}
