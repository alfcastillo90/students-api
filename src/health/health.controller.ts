import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { DynamoDBHealthIndicator } from './dynamodb.health';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller(['health'])
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dynamoDBHealthIndicator: DynamoDBHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    console.log('health controller');
    return this.health.check([
      async () => this.dynamoDBHealthIndicator.isHealthy('dynamoDB'),
    ]);
  }
}
