import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { postsAPI } from '../services/api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Filtrar posts baseado no termo de busca
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await postsAPI.getAllPosts();
      // Filtrar apenas posts publicados
      const publishedPosts = postsData.filter(post => post.published);
      setPosts(publishedPosts);
      setError('');
    } catch (err) {
      setError('Erro ao carregar posts. Verifique se o servidor está funcionando.');
      console.error('Erro ao carregar posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-page">
        <div className="page-header">
          <h1>Blog Escolar</h1>
          <p>Compartilhando conhecimento entre docentes e alunos</p>
        </div>

        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar posts por título ou conteúdo..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="posts-section">
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              {searchTerm ? 'Nenhum post encontrado para sua busca.' : 'Nenhum post disponível no momento.'}
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-header">
                    <h2 className="post-title">
                      <a href={`/post/${post.id}`}>{post.title}</a>
                    </h2>
                    <div className="post-meta">
                      <span className="author">Por: {post.person?.name || 'Autor não identificado'}</span>
                      {post.createdAt && (
                        <span className="date">
                          {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content ? truncateText(post.content, 200) : 'Sem conteúdo'}</p>
                  </div>
                  
                  <div className="post-footer">
                    <a href={`/post/${post.id}`} className="read-more">
                      Ler mais
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
