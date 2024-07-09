import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigModule sea globalmente accesible en toda la aplicación
    }),
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
