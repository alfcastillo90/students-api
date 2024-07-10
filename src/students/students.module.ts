import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DynamoDB } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    {
      provide: 'DYNAMODB',
      useFactory: () => {
        return new DynamoDB.DocumentClient({
          region: 'us-east-1', // Asegúrate de que esta región coincide con la región de tu tabla
        });
      },
    },
  ],
})
export class StudentsModule {}
  