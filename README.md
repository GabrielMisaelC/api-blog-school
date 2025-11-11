# Documentação do Tech Challenge - Fase 03

## Descrição do Projeto

Na Fase 3 do Tech Challenge, evoluímos a aplicação **Blog Escolar**, que na fase anterior já contava com um back-end desenvolvido em **NestJS**.  
O foco desta etapa foi a criação de uma **interface gráfica robusta, responsiva e intuitiva**, utilizando **React.js**, permitindo que professores(as) e alunos(as) interajam com a plataforma de forma prática e acessível.

A aplicação possibilita:

- Professores criarem, editarem e gerenciarem postagens.
- Alunos lerem e comentarem conteúdos.
- Visitantes acessarem os posts sem necessidade de login.

---

## Tecnologias Utilizadas

### Backend

- Node.js
- NestJS
- Prisma ORM
- SQLite
- Jest

### Frontend

- React.js
- React Router
- Axios
- Context API

### Infraestrutura

- Docker
- GitHub Actions (CI/CD)

---

## Arquitetura do Projeto

### Backend (NestJS)

```
api-blog-school-main/
├── src/
│   ├── post/          # Módulo de posts
│   ├── person/        # Módulo de pessoas
│   ├── comment/       # Módulo de comentários
│   └── database/      # Configuração do Prisma
├── prisma/            # Schema e migrações
└── test/              # Testes unitários
```

### Frontend (React)

```
frontend/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Telas principais
│   ├── services/      # API com Axios
│   ├── context/       # Context API (autenticação)
└── public/
```

---

## Guia de Instalação e Execução

### Pré-requisitos

- Node.js v16+
- npm ou yarn
- Git
- Docker (opcional)

### Configuração do Backend

```bash
cd api-blog-school-main
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

Backend disponível em: `http://localhost:3000`

### Configuração do Frontend

```bash
cd frontend
npm install
npm start
```

Frontend disponível em: `http://localhost:3001`

### Acessando a Aplicação

- Página Principal: `http://localhost:3001`
- API Backend: `http://localhost:3000`

---

## Endpoints da API

### Posts

- `GET /post` – Lista todos os posts
- `GET /post/:id` – Busca post específico
- `POST /post` – Cria novo post
- `PATCH /post/:id` – Atualiza post
- `DELETE /post/:id` – Remove post

### Pessoas

- `GET /person` – Lista todas as pessoas
- `GET /person/:id` – Busca pessoa específica
- `POST /person` – Cria nova pessoa
- `PATCH /person/:id` – Atualiza pessoa
- `DELETE /person/:id` – Remove pessoa

### Comentários

- `GET /comment` – Lista comentários
- `POST /comment` – Cria comentário
- `PATCH /comment/:id` – Atualiza comentário
- `DELETE /comment/:id` – Remove comentário

---

## Funcionalidades

### Visitantes

- Visualizar lista de posts
- Buscar posts por palavras-chave
- Ler posts completos

### Professores (logados)

- Criar posts
- Editar posts
- Excluir posts
- Acessar área administrativa
- Comentar em posts

### Alunos (logados)

- Ler posts
- Buscar posts
- Comentar em posts

---

## Testes Unitários - API

### Visão Geral

- Framework: Jest
- Cobertura total: 26.72% (meta: 20%)
- Cobertura do módulo de posts: 100%

### Estrutura

```
test/
├── unit/
│   └── post/
│       ├── post.controller.spec.ts
│       └── post.service.spec.ts
├── mocks/
│   └── prisma.service.mock.ts
```

### Comandos

```bash
npm test          # Executa testes
npm run test:cov  # Relatório de cobertura
npm run test:watch
```

### Boas Práticas Aplicadas

- Testes independentes e focados
- Casos de sucesso e erro
- Mocks do Prisma para isolar dependências
- Nomes descritivos como documentação viva

---

## Scripts Disponíveis

### Backend

```bash
npm run start:dev   # Desenvolvimento
npm run build       # Build de produção
npm run test        # Testes unitários
```

### Frontend

```bash
npm start           # Desenvolvimento
npm run build       # Build de produção
npm test            # Testes unitários
```

---

## CI/CD com GitHub Actions

Pipeline configurado para:

- Instalação de dependências
- Execução de testes
- Validação de build

---

## Suporte e Troubleshooting

- Erro CORS → Ajustar configuração no backend ou proxy no frontend.
- Portas em uso → Certificar-se de que `3000` (API) e `3001` (frontend) estão livres.
- Falha no backend → Verificar instalação do Node.js e dependências.

---

## Experiência da Equipe

Durante esta fase, os principais desafios foram:

- Estilização responsiva.
- Implementação de autenticação e rotas protegidas no React.
- Integração com o backend NestJS utilizando Axios.
- Aprendizado prático em testes unitários e cobertura mínima de código.

A boa comunicação e a divisão equilibrada das tarefas foram fundamentais para o sucesso do projeto.

---

## Entregáveis

1. Repositório GitHub com backend e frontend.
2. Dockerfiles e configuração para execução dos serviços.
3. Pipeline CI/CD com GitHub Actions.
4. Documentação completa.
5. Vídeo de apresentação da aplicação em funcionamento.

---

## Conclusão

A aplicação Blog Escolar agora oferece uma experiência completa de **criação, gestão e consumo de conteúdo educacional**, com autenticação, interface moderna e integração total entre frontend e backend.
