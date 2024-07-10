import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DynamoDB } from 'aws-sdk';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject('DYNAMODB') private readonly dynamoDB: DynamoDB.DocumentClient,
  ) {}

  @Get()
  async check() {
    try {
      await this.dynamoDB
        .scan({ TableName: 'students-table', Limit: 1 })
        .promise();
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'ok',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }
}
