import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    apiKeyGuard = new ApiKeyGuard(configService);
  });

  it('should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });

  it('should return true if the API key is valid', () => {
    const mockExecutionContext = createMockExecutionContext('validApiKey');
    jest.spyOn(configService, 'get').mockReturnValue('validApiKey');

    expect(apiKeyGuard.canActivate(mockExecutionContext)).toBe(true);
  });

  it('should throw UnauthorizedException if the API key is invalid', () => {
    const mockExecutionContext = createMockExecutionContext('invalidApiKey');
    jest.spyOn(configService, 'get').mockReturnValue('validApiKey');

    expect(() => apiKeyGuard.canActivate(mockExecutionContext)).toThrow(
      new UnauthorizedException('Invalid API Key'),
    );
  });

  function createMockExecutionContext(apiKey: string): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': apiKey,
          },
        }),
      }),
    } as ExecutionContext;
  }
});
