import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addStudentData() {
  try {
    // Adicionar um aluno de teste
    const student = await prisma.person.create({
      data: {
        email: 'aluno@escola.com',
        name: 'João Silva',
        password: 'aluno123',
        isTeacher: false,
        isStudent: true,
      },
    });

    console.log('Aluno criado:', student);

    // Adicionar mais alguns alunos
    const students = await prisma.person.createMany({
      data: [
        {
          email: 'maria@escola.com',
          name: 'Maria Santos',
          password: 'aluno123',
          isTeacher: false,
          isStudent: true,
        },
        {
          email: 'pedro@escola.com',
          name: 'Pedro Oliveira',
          password: 'aluno123',
          isTeacher: false,
          isStudent: true,
        },
      ],
    });

    console.log('Alunos adicionais criados:', students);

  } catch (error) {
    console.error('Erro ao criar alunos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addStudentData();
