import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { DynamoDBHealthIndicator } from './dynamodb.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dynamoDBHealthIndicator: DynamoDBHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.dynamoDBHealthIndicator.isHealthy('dynamoDB'),
    ]);
  }
}
