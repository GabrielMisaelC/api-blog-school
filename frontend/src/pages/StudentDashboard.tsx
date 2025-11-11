import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { postsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './StudentDashboard.css';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
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
    return text.substr(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <p>Carregando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="student-dashboard">
        {/* Cabeçalho da Área do Aluno */}
        <div className="student-header">
          <div className="student-welcome">
            <h1>Área do Aluno</h1>
            <p className="welcome-message">
              Olá, <strong>{user?.name}</strong>! Bem-vindo(a) à sua área de estudos.
            </p>
          </div>
          <div className="student-info">
            <div className="info-card">
              <h3>Seus Estudos</h3>
              <p>Aqui você pode ler todos os materiais publicados pelos professores</p>
            </div>
          </div>
        </div>

        {/* Barra de Busca */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{filteredPosts.length}</div>
              <div className="stat-label">Posts Disponíveis</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{posts.filter(p => p.published).length}</div>
              <div className="stat-label">Materiais Publicados</div>
            </div>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="posts-section">
          <h2>Materiais de Estudo</h2>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={loadPosts} className="btn btn-primary">
                Tentar Novamente
              </button>
            </div>
          )}

          {filteredPosts.length === 0 && !error ? (
            <div className="no-posts">
              <div className="no-posts-content">
                <h3>📚 Nenhum material encontrado</h3>
                <p>
                  {searchTerm 
                    ? 'Não encontramos materiais com os termos pesquisados.'
                    : 'Os professores ainda não publicaram materiais de estudo.'
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="btn btn-outline"
                  >
                    Limpar Busca
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="post-card student-post-card">
                  <div className="post-header">
                    <h3 className="post-title">
                      <a href={`/post/${post.id}`} className="post-link">
                        {post.title}
                      </a>
                    </h3>
                    <div className="post-meta">
                      <span className="post-author">
                        👨‍🏫 {post.person?.name || 'Professor'}
                      </span>
                      <span className="post-date">
                        📅 {post.createdAt ? formatDate(post.createdAt) : 'Data não disponível'}
                      </span>
                    </div>
                  </div>
                  
                  {post.content && (
                    <div className="post-excerpt">
                      <p>{truncateText(post.content, 150)}</p>
                    </div>
                  )}

                  <div className="post-actions">
                    <a href={`/post/${post.id}`} className="btn btn-primary btn-sm">
                      📖 Ler Material
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Informações Adicionais para Alunos */}
        <div className="student-help">
          <div className="help-section">
            <h3>💡 Dicas de Estudo</h3>
            <ul>
              <li>Use a barra de busca para encontrar materiais específicos</li>
              <li>Clique em "📖 Ler Material" para ver o conteúdo completo</li>
              <li>Os materiais são organizados por data de publicação</li>
              <li>Em caso de dúvidas, consulte seu professor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
