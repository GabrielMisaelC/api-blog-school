import axios from 'axios';
import { Post, CreatePostDto, UpdatePostDto, Person, CreatePersonDto, Comment, SearchPostsDto } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Posts API
export const postsAPI = {
  // Buscar todos os posts
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/post');
    return response.data;
  },

  // Buscar post por ID
  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get(`/post/${id}`);
    return response.data;
  },

  // Criar novo post
  createPost: async (postData: CreatePostDto): Promise<Post> => {
    const response = await api.post('/post', postData);
    return response.data;
  },

  // Atualizar post
  updatePost: async (id: number, postData: UpdatePostDto): Promise<Post> => {
    const response = await api.patch(`/post/${id}`, postData);
    return response.data;
  },

  // Deletar post
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/post/${id}`);
  },

  // Buscar posts com filtros
  searchPosts: async (searchParams: SearchPostsDto): Promise<Post[]> => {
    const params = new URLSearchParams();
    if (searchParams.search) params.append('search', searchParams.search);
    if (searchParams.page) params.append('page', searchParams.page.toString());
    if (searchParams.limit) params.append('limit', searchParams.limit.toString());
    
    const response = await api.get(`/post/search?${params.toString()}`);
    return response.data;
  },
};

// Persons API
export const personsAPI = {
  // Buscar todas as pessoas
  getAllPersons: async (): Promise<Person[]> => {
    const response = await api.get('/person');
    return response.data;
  },

  // Buscar pessoa por ID
  getPersonById: async (id: number): Promise<Person> => {
    const response = await api.get(`/person/${id}`);
    return response.data;
  },

  // Criar nova pessoa
  createPerson: async (personData: CreatePersonDto): Promise<Person> => {
    const response = await api.post('/person', personData);
    return response.data;
  },

  // Atualizar pessoa
  updatePerson: async (id: number, personData: Partial<CreatePersonDto>): Promise<Person> => {
    const response = await api.patch(`/person/${id}`, personData);
    return response.data;
  },

  // Deletar pessoa
  deletePerson: async (id: number): Promise<void> => {
    await api.delete(`/person/${id}`);
  },
};

// Comments API
export const commentsAPI = {
  // Buscar todos os comentários
  getAllComments: async (): Promise<Comment[]> => {
    const response = await api.get('/comment');
    return response.data;
  },

  // Buscar comentário por ID
  getCommentById: async (id: number): Promise<Comment> => {
    const response = await api.get(`/comment/${id}`);
    return response.data;
  },

  // Criar novo comentário
  createComment: async (commentData: { content: string; postid: number; personid: number }): Promise<Comment> => {
    const response = await api.post('/comment', commentData);
    return response.data;
  },

  // Atualizar comentário
  updateComment: async (id: number, commentData: { content?: string }): Promise<Comment> => {
    const response = await api.patch(`/comment/${id}`, commentData);
    return response.data;
  },

  // Deletar comentário
  deleteComment: async (id: number): Promise<void> => {
    await api.delete(`/comment/${id}`);
  },
};

// Auth API (simulado - você pode implementar autenticação real no backend)
export const authAPI = {
  // Login - usando endpoint real do backend
  login: async (email: string, password: string): Promise<Person> => {
    try {
      const response = await api.post('/person/login', { email, password });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Credenciais inválidas');
      }
      
      const user = response.data.user;
      
      // Simular geração de token
      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro de autenticação');
      }
      throw new Error('Erro de conexão com o servidor');
    }
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Verificar se usuário está logado
  getCurrentUser: (): Person | null => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Verificar se usuário está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};

export default api;
