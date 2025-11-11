const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Criar usuário professor
    const teacher = await prisma.person.create({
      data: {
        name: 'Professor Silva',
        email: 'professor@escola.com',
        password: 'professor123', // Em produção, seria hasheada
        isTeacher: true,
        isStudent: false
      }
    });

    console.log('✅ Usuário professor criado:', teacher);

    // Criar alguns posts de exemplo
    const post1 = await prisma.post.create({
      data: {
        title: 'Introdução à Matemática Básica',
        content: `
Este é um post introdutório sobre matemática básica para alunos do ensino fundamental.

## Conteúdo Abordado:
- Operações básicas (soma, subtração, multiplicação, divisão)
- Frações e decimais
- Geometria básica

A matemática é uma disciplina fundamental que desenvolve o raciocínio lógico e a capacidade de resolver problemas. Neste curso, exploraremos os conceitos básicos de forma didática e interativa.

### Exercícios Práticos:
1. Calcule: 25 + 37 = ?
2. Qual é a metade de 100?
3. Quantos lados tem um triângulo?

Esperamos que este conteúdo seja útil para os estudantes!
        `.trim(),
        published: true,
        personid: teacher.id
      }
    });

    const post2 = await prisma.post.create({
      data: {
        title: 'História do Brasil: Período Colonial',
        content: `
Uma visão abrangente sobre o período colonial brasileiro, desde o descobrimento até a independência.

## Tópicos Principais:
- Chegada dos portugueses (1500)
- Exploração do pau-brasil
- Colonização e capitanias hereditárias
- Ciclo do açúcar
- Ciclo do ouro
- Sociedade colonial

### Curiosidades:
- O Brasil foi colônia de Portugal por mais de 300 anos
- A primeira capital foi Salvador (BA)
- A transferência da corte portuguesa para o Rio de Janeiro em 1808 foi um marco importante

Este período foi fundamental para a formação da identidade brasileira!
        `.trim(),
        published: true,
        personid: teacher.id
      }
    });

    const post3 = await prisma.post.create({
      data: {
        title: 'Ciências: Sistema Solar',
        content: `
Explorando nosso sistema solar e os planetas que o compõem.

## Os 8 Planetas:
1. **Mercúrio** - O mais próximo do Sol
2. **Vênus** - O mais quente
3. **Terra** - Nosso lar
4. **Marte** - O planeta vermelho
5. **Júpiter** - O maior planeta
6. **Saturno** - Famoso pelos seus anéis
7. **Urano** - Gira de lado
8. **Netuno** - O mais distante

### Fatos Interessantes:
- O Sol é uma estrela de tamanho médio
- A Terra é o único planeta conhecido com vida
- Saturno é menos denso que a água
- Um dia em Vênus dura mais que um ano em Vênus

A astronomia nos ajuda a entender nosso lugar no universo!
        `.trim(),
        published: true,
        personid: teacher.id
      }
    });

    console.log('✅ Posts criados:', post1.title, post2.title, post3.title);

    // Criar alguns comentários de exemplo
    await prisma.comment.create({
      data: {
        content: 'Excelente explicação! Muito didática e fácil de entender.',
        published: true,
        postid: post1.id
      }
    });

    await prisma.comment.create({
      data: {
        content: 'Poderia abordar mais sobre a geometria espacial no próximo post?',
        published: true,
        postid: post1.id
      }
    });

    await prisma.comment.create({
      data: {
        content: 'Muito interessante a parte sobre o ciclo do ouro!',
        published: true,
        postid: post2.id
      }
    });

    await prisma.comment.create({
      data: {
        content: 'Fantástico! Não sabia que Vênus era mais quente que Mercúrio.',
        published: true,
        postid: post3.id
      }
    });

    console.log('✅ Comentários criados com sucesso!');
    console.log('🎉 Seed concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
