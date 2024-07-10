import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');
    console.log('request', request.headers);
    console.log('validApiKey', validApiKey);
    console.log('apiKey', apiKey);

    if (apiKey && apiKey === validApiKey) {
      return true;
    } else {
      console.log('Invalid API Key');
      throw new UnauthorizedException('Invalid API Key');
    }
  }
}
