import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DynamoDB } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [HealthController],
  providers: [
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
export class HealthModule {}
