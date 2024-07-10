import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the student' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the student' })
  @IsEmail()
  email: string;
}
