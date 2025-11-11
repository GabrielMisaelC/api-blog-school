import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';
import { Post } from '../types';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  
  const { user, isAuthenticated, isTeacher } = useAuth();

  const loadPosts = React.useCallback(async () => {
    try {
      setLoading(true);
      const postsData = await postsAPI.getAllPosts();
      // Filtrar apenas os posts do usuário logado
      const userPosts = postsData.filter(post => post.personid === user?.id);
      setPosts(userPosts);
      setError('');
    } catch (err) {
      setError('Erro ao carregar posts');
      console.error('Erro ao carregar posts:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated && isTeacher) {
      loadPosts();
    }
  }, [isAuthenticated, isTeacher, loadPosts]);

  // Verificar se o usuário está autenticado e é professor
  if (!isAuthenticated || !isTeacher) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Apenas professores autenticados podem acessar a área administrativa.</p>
          <div className="action-buttons">
            <a href="/login" className="btn btn-primary">Fazer Login</a>
            <a href="/" className="btn btn-outline">Voltar ao Início</a>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = async (postId: number, postTitle: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o post "${postTitle}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    setDeleteLoading(postId);
    try {
      await postsAPI.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Erro ao deletar post:', err);
      alert('Erro ao deletar o post. Tente novamente.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleTogglePublish = async (post: Post) => {
    const newPublishedStatus = !post.published;
    const actionText = newPublishedStatus ? 'publicar' : 'despublicar';
    
    if (!window.confirm(`Tem certeza que deseja ${actionText} o post "${post.title}"?`)) {
      return;
    }

    try {
      await postsAPI.updatePost(post.id, {
        published: newPublishedStatus
      });
      
      setPosts(posts.map(p => p.id === post.id ? { ...p, published: newPublishedStatus } : p));
    } catch (err) {
      console.error('Erro ao atualizar post:', err);
      alert('Erro ao atualizar o post. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando posts...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin-page">
        <div className="page-header">
          <h1>Área Administrativa</h1>
          <p>Gerencie seus posts</p>
          <div className="header-actions">
            <a href="/create-post" className="btn btn-primary">
              + Novo Post
            </a>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadPosts} className="btn btn-sm">
              Tentar novamente
            </button>
          </div>
        )}

        <div className="stats-cards">
          <div className="stat-card">
            <h3>{posts.length}</h3>
            <p>Total de Posts</p>
          </div>
          <div className="stat-card">
            <h3>{posts.filter(post => post.published).length}</h3>
            <p>Posts Publicados</p>
          </div>
          <div className="stat-card">
            <h3>{posts.filter(post => !post.published).length}</h3>
            <p>Rascunhos</p>
          </div>
        </div>

        <div className="posts-section">
          <h2>Seus Posts</h2>
          
          {posts.length === 0 ? (
            <div className="no-posts">
              <h3>Você ainda não criou nenhum post</h3>
              <p>Comece compartilhando seu conhecimento criando seu primeiro post!</p>
              <a href="/create-post" className="btn btn-primary">
                Criar Primeiro Post
              </a>
            </div>
          ) : (
            <div className="posts-table-container">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className={!post.published ? 'draft' : ''}>
                      <td>
                        <div className="post-info">
                          <h4 className="post-title">
                            <a href={`/post/${post.id}`}>
                              {post.title}
                            </a>
                          </h4>
                          {post.content && (
                            <p className="post-excerpt">
                              {post.content.substring(0, 100)}
                              {post.content.length > 100 ? '...' : ''}
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td>
                        {post.createdAt ? (
                          <div className="date-info">
                            <div>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</div>
                            <div className="time">
                              {new Date(post.createdAt).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        ) : (
                          'Data não disponível'
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <a href={`/post/${post.id}`} className="btn btn-sm btn-outline">
                            Ver
                          </a>
                          <a href={`/edit-post/${post.id}`} className="btn btn-sm btn-primary">
                            Editar
                          </a>
                          <button
                            onClick={() => handleTogglePublish(post)}
                            className={`btn btn-sm ${post.published ? 'btn-warning' : 'btn-success'}`}
                          >
                            {post.published ? 'Despublicar' : 'Publicar'}
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            disabled={deleteLoading === post.id}
                            className="btn btn-sm btn-danger"
                          >
                            {deleteLoading === post.id ? '...' : 'Excluir'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
