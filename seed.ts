import { DynamoDB } from 'aws-sdk';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

// Cargar variables de entorno desde el archivo .env
config();

const dynamoDB = new DynamoDB.DocumentClient({
  region: 'us-east-1', // Cambia esto si tu tabla está en otra región
  // No necesitamos endpoint para AWS DynamoDB
});

const studentsTable = process.env.STUDENTS_TABLE || 'students-dev';

// Función para generar un estudiante aleatorio
const generateRandomStudent = () => ({
  id: uuidv4(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
});

// Generar una lista de estudiantes aleatorios
const students = Array.from({ length: 10 }, generateRandomStudent); // Cambia el número 10 al número de estudiantes que deseas generar

// Función para llenar la base de datos
const seedDatabase = async () => {
  try {
    for (const student of students) {
      await dynamoDB
        .put({
          TableName: studentsTable,
          Item: student,
        })
        .promise();
      console.log(`Student ${student.name} added`);
    }
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Ejecutar la función
seedDatabase();
