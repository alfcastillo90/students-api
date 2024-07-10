import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DynamoDB } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { DynamoDBHealthIndicator } from './dynamodb.health';

@Module({
  imports: [ConfigModule, TerminusModule],
  controllers: [HealthController],
  providers: [
    DynamoDBHealthIndicator,
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
