# 🚀 Guia de Instalação e Execução - Blog Escolar

Este guia contém as instruções completas para configurar e executar tanto o backend (NestJS) quanto o frontend (React) da aplicação Blog Escolar.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (incluído com Node.js) ou **yarn**
- **Git** (opcional, para clonar o repositório)

## 🟢 SOLUÇÃO RÁPIDA - Se npm não for reconhecido

### Opção 1: Instalação Automática (Windows 10/11)
1. Abra PowerShell como **Administrador**
2. Execute: `winget install OpenJS.NodeJS`
3. **Feche e reabra o PowerShell**
4. Execute o script: `.\setup.bat`

### Opção 2: Instalação Manual
1. Baixe Node.js em: https://nodejs.org/
2. Execute o instalador e **marque "Add to PATH"**
3. **Reinicie o computador**
4. Teste: `node --version` e `npm --version`

## 🔧 Configuração do Backend (API)

### 1. Navegue até a pasta raiz do projeto
```bash
cd api-blog-school-main
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
O projeto usa SQLite, então não há necessidade de configuração adicional de banco.

### 4. Execute as migrações do Prisma (se necessário)
```bash
npx prisma generate
npx prisma db push
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run start:dev
```

O backend estará rodando em `http://localhost:3000`

### 6. Verifique se está funcionando
Acesse `http://localhost:3000` no seu navegador. Você deve ver a API funcionando.

## 🎨 Configuração do Frontend (React)

### 1. Abra um novo terminal e navegue até a pasta frontend
```bash
cd frontend
```

### 2. Instale as dependências do React
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm start
```

O frontend estará rodando em `http://localhost:3001`

## 🌐 Acessando a Aplicação

1. **Página Principal**: `http://localhost:3001`
2. **API Documentation (Swagger)**: `http://localhost:3000` (se configurado)

## 👥 Usuários para Teste

Para testar as funcionalidades, você pode criar usuários através da API ou usar as credenciais de demonstração que serão exibidas na tela de login.

### Criando um Professor via API:

Faça uma requisição POST para `http://localhost:3000/person`:

```json
{
  "email": "professor@escola.com",
  "name": "Professor Silva",
  "password": "professor123",
  "isTeacher": true,
  "isStudent": false,
  "schoolMaterial": 1
}
```

### Criando um Aluno via API:

```json
{
  "email": "aluno@escola.com", 
  "name": "João Aluno",
  "password": "aluno123",
  "isTeacher": false,
  "isStudent": true,
  "schoolMaterial": 1
}
```

## 📝 Funcionalidades Disponíveis

### Para Visitantes (não logados):
- ✅ Visualizar lista de posts
- ✅ Buscar posts por palavras-chave
- ✅ Ler posts completos

### Para Professores (logados):
- ✅ Todas as funcionalidades de visitantes
- ✅ Criar novos posts
- ✅ Editar posts próprios
- ✅ Gerenciar posts (publicar/despublicar/excluir)
- ✅ Área administrativa
- ✅ Comentar em posts

### Para Alunos (logados):
- ✅ Todas as funcionalidades de visitantes
- ✅ Comentar em posts

## 🐛 Solução de Problemas

### Backend não inicia:
- Verifique se a porta 3000 não está sendo usada por outro processo
- Execute `npm install` novamente
- Verifique se o Node.js está instalado corretamente

### Frontend não inicia:
- Verifique se a porta 3001 está livre
- Execute `npm install` na pasta frontend
- Certifique-se de que o backend está rodando primeiro

### Erro de CORS:
- Verifique se o backend está configurado para aceitar requisições do frontend
- O proxy no package.json do frontend deve apontar para `http://localhost:3000`

### Erro de conexão com API:
- Verifique se o backend está rodando na porta 3000
- Confirme que não há firewall bloqueando as conexões

## 📊 Endpoints da API

### Posts:
- `GET /post` - Lista todos os posts
- `GET /post/:id` - Busca post específico  
- `POST /post` - Cria novo post
- `PATCH /post/:id` - Atualiza post
- `DELETE /post/:id` - Remove post

### Pessoas:
- `GET /person` - Lista todas as pessoas
- `GET /person/:id` - Busca pessoa específica
- `POST /person` - Cria nova pessoa
- `PATCH /person/:id` - Atualiza pessoa
- `DELETE /person/:id` - Remove pessoa

### Comentários:
- `GET /comment` - Lista todos os comentários
- `POST /comment` - Cria novo comentário
- `PATCH /comment/:id` - Atualiza comentário
- `DELETE /comment/:id` - Remove comentário

## 🔧 Scripts Disponíveis

### Backend:
```bash
npm run start          # Inicia em modo produção
npm run start:dev      # Inicia em modo desenvolvimento
npm run start:debug    # Inicia em modo debug
npm run build          # Compila o projeto
npm run test           # Executa testes
```

### Frontend:
```bash
npm start              # Inicia servidor de desenvolvimento
npm run build          # Cria build de produção
npm test               # Executa testes
npm run eject          # Ejeta configurações (não recomendado)
```

## 📁 Estrutura de Pastas

```
api-blog-school-main/
├── src/                    # Código fonte do backend
│   ├── post/              # Módulo de posts
│   ├── person/            # Módulo de pessoas
│   ├── comment/           # Módulo de comentários
│   └── database/          # Configuração do Prisma
├── prisma/                # Schema e migrações do banco
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   └── types/         # Tipos TypeScript
│   └── public/            # Arquivos públicos
└── test/                  # Testes do backend
```

## 🚀 Deploy para Produção

### Backend:
1. Execute `npm run build`
2. Configure variáveis de ambiente de produção
3. Execute `npm run start:prod`

### Frontend:
1. Execute `npm run build`
2. Sirva os arquivos da pasta `build` com um servidor web
3. Configure proxy reverso se necessário

## 📞 Suporte

Se encontrar problemas:

1. Verifique se seguiu todas as etapas de instalação
2. Consulte os logs do console para erros específicos
3. Certifique-se de que todas as dependências foram instaladas
4. Verifique se as portas não estão sendo usadas por outros processos

---

**Pronto!** Agora você tem uma aplicação completa de blog escolar funcionando localmente. 🎉

A aplicação oferece uma experiência completa para gerenciamento de posts educacionais, com controle de acesso baseado em perfis e interface responsiva para diferentes dispositivos.
