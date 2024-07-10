import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StudentsModule } from './students/students.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigModule sea globalmente accesible en toda la aplicación
    }),
    StudentsModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
