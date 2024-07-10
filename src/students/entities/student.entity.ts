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
}
