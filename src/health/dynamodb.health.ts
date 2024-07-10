import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBHealthIndicator extends HealthIndicator {
  private dynamoDB: DynamoDB;

  constructor() {
    super();
    this.dynamoDB = new DynamoDB({
      region: 'us-east-1',
    });
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const params = {
      TableName: 'students-dev',
      Limit: 1,
    };

    try {
      await this.dynamoDB.scan(params).promise();
      return this.getStatus(key, true);
    } catch (err) {
      throw new HealthCheckError('DynamoDB health check failed', err);
    }
  }
}
