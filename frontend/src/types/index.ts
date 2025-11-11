export interface Person {
  id: number;
  email: string;
  name: string;
  password?: string;
  isTeacher: boolean;
  isStudent: boolean;
  post?: Post[];
  comment?: Comment[];
}

export interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  personid: number;
  person?: Person;
  comment?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  id: number;
  content: string;
  postid: number;
  personid: number;
  post?: Post;
  person?: Person;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostDto {
  title: string;
  content?: string;
  published: boolean;
  personid: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface CreatePersonDto {
  email: string;
  name: string;
  password: string;
  isTeacher: boolean;
  isStudent: boolean;
  schoolMaterial: number;
}

export interface SearchPostsDto {
  search?: string;
  page?: number;
  limit?: number;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  isTeacher: boolean;
  isStudent: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
