import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: '123', description: 'The ID of the student' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the student',
  })
  @IsEmail()
  email: string;
}
