# Blog Escolar - Frontend

Interface gráfica responsiva para o sistema de blogging escolar, desenvolvida com React e TypeScript.

## 🚀 Funcionalidades Implementadas

### 1. Página Principal (Lista de Posts)
- ✅ Exibição de todos os posts publicados
- ✅ Visualização do título, autor e descrição de cada post
- ✅ Campo de busca para filtrar posts por palavras-chave
- ✅ Design responsivo com cards organizados em grid

### 2. Página de Leitura de Post
- ✅ Exibição do conteúdo completo do post
- ✅ Informações do autor e data de publicação
- ✅ Sistema de comentários (opcional para usuários logados)
- ✅ Navegação com breadcrumbs

### 3. Página de Criação de Posts
- ✅ Formulário para professores criarem postagens
- ✅ Campos para título, conteúdo e status de publicação
- ✅ Pré-visualização em tempo real
- ✅ Validação de formulário
- ✅ Controle de acesso (apenas professores)

### 4. Página de Edição de Posts
- ✅ Formulário para editar postagens existentes
- ✅ Carregamento automático dos dados atuais
- ✅ Pré-visualização das alterações
- ✅ Controle de propriedade (usuário só edita seus próprios posts)

### 5. Página Administrativa
- ✅ Lista completa dos posts do professor
- ✅ Estatísticas (total de posts, publicados, rascunhos)
- ✅ Ações: visualizar, editar, publicar/despublicar, excluir
- ✅ Interface tabular responsiva

### 6. Sistema de Autenticação
- ✅ Página de login para professores
- ✅ Controle de acesso baseado em roles
- ✅ Proteção de rotas administrativas
- ✅ Persistência de sessão com localStorage

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento do lado cliente
- **Axios** - Cliente HTTP para comunicação com API
- **CSS Modules** - Estilização modular
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   └── ProtectedRoute.tsx
│   ├── contexts/           # Contextos React
│   │   └── AuthContext.tsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── HomePage.tsx/.css
│   │   ├── LoginPage.tsx/.css
│   │   ├── PostPage.tsx/.css
│   │   ├── CreatePostPage.tsx/.css
│   │   ├── EditPostPage.tsx/.css
│   │   └── AdminPage.tsx/.css
│   ├── services/           # Serviços de API
│   │   └── api.ts
│   ├── types/              # Definições TypeScript
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da API rodando (porta 3000)

### Instalação
```bash
cd frontend
npm install
```

### Desenvolvimento
```bash
npm start
```
A aplicação estará disponível em `http://localhost:3001`

### Build para Produção
```bash
npm run build
```

## 🔗 Comunicação com API

A aplicação se comunica com o backend através dos seguintes endpoints:

- `GET /post` - Lista todos os posts
- `GET /post/:id` - Busca post específico
- `POST /post` - Cria novo post
- `PATCH /post/:id` - Atualiza post
- `DELETE /post/:id` - Remove post
- `GET /person` - Lista pessoas (para autenticação)
- `GET /comment` - Lista comentários
- `POST /comment` - Cria comentário

## 👥 Sistema de Usuários

### Roles Implementadas:
- **Professor (`isTeacher: true`)**: Pode criar, editar e gerenciar posts
- **Aluno (`isStudent: true`)**: Pode visualizar posts e comentar

### Autenticação:
- Sistema simulado baseado em email/senha
- Token armazenado no localStorage
- Verificação de permissões em rotas protegidas

## 🎨 Design e UX

### Características:
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Navegação por teclado e labels apropriadas
- **Intuitivo**: Interface limpa e organizada
- **Performance**: Carregamento otimizado de componentes

### Paleta de Cores:
- Azul principal: `#007bff`
- Cinza texto: `#333333`
- Cinza claro: `#f8f9fa`
- Verde sucesso: `#28a745`
- Vermelho erro: `#dc3545`

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- Desktop: `> 968px`
- Tablet: `768px - 968px`
- Mobile: `< 768px`

## 🔒 Segurança

- Validação de entrada no frontend
- Controle de acesso baseado em roles
- Sanitização de dados exibidos
- Proteção contra XSS básica

## 🐛 Tratamento de Erros

- Estados de loading para operações assíncronas
- Mensagens de erro amigáveis
- Fallbacks para casos de falha na API
- Páginas de erro personalizadas (404)

## 📝 Próximas Melhorias

- [ ] Sistema de notificações em tempo real
- [ ] Upload de imagens para posts
- [ ] Editor de texto rico (WYSIWYG)
- [ ] Sistema de categorias e tags
- [ ] Compartilhamento social
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Nota**: Esta aplicação foi desenvolvida para fins educacionais e demonstração de conceitos de desenvolvimento web moderno com React e TypeScript.
