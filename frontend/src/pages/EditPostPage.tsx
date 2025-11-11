import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';
import { Post } from '../types';
import './EditPostPage.css';

interface EditPostPageProps {
  postId: number;
}

const EditPostPage: React.FC<EditPostPageProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [published, setPublished] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  
  const { user, isAuthenticated, isTeacher } = useAuth();

  const loadPost = React.useCallback(async () => {
    try {
      setLoading(true);
      const postData = await postsAPI.getPostById(postId);
      
      // Verificar se o post pertence ao usuário logado
      if (postData.personid !== user?.id) {
        setError('Você não tem permissão para editar este post');
        return;
      }

      setPost(postData);
      setTitle(postData.title);
      setContent(postData.content || '');
      setPublished(postData.published);
      setError('');
    } catch (err) {
      setError('Post não encontrado ou erro ao carregar');
      console.error('Erro ao carregar post:', err);
    } finally {
      setLoading(false);
    }
  }, [postId, user?.id]);

  useEffect(() => {
    if (isAuthenticated && isTeacher) {
      loadPost();
    }
  }, [isAuthenticated, isTeacher, loadPost]);

  // Verificar se o usuário está autenticado e é professor
  if (!isAuthenticated || !isTeacher) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Apenas professores autenticados podem editar posts.</p>
          <div className="action-buttons">
            <a href="/login" className="btn btn-primary">Fazer Login</a>
            <a href="/" className="btn btn-outline">Voltar ao Início</a>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const updatedPost = await postsAPI.updatePost(postId, {
        title: title.trim(),
        content: content.trim() || undefined,
        published
      });

      setPost(updatedPost);
      setSuccess(true);
      
      // Redirecionar após alguns segundos
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar o post');
      console.error('Erro ao atualizar post:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const hasChanges = 
      title !== (post?.title || '') ||
      content !== (post?.content || '') ||
      published !== (post?.published || false);

    if (hasChanges) {
      if (window.confirm('Você tem alterações não salvas. Deseja realmente cancelar?')) {
        window.location.href = '/admin';
      }
    } else {
      window.location.href = '/admin';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando post...</div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container">
        <div className="error">
          {error}
          <br />
          <a href="/admin" className="back-link">← Voltar à administração</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="edit-post-page">
        <div className="page-header">
          <h1>Editar Postagem</h1>
          <p>Atualize o conteúdo do seu post</p>
        </div>

        {success && (
          <div className="success-message">
            <h3>Post atualizado com sucesso!</h3>
            <p>Redirecionando para a área administrativa...</p>
          </div>
        )}

        <div className="edit-post-form">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Título do Post *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do seu post..."
                disabled={saving}
                className="form-input"
                maxLength={200}
              />
              <div className="char-count">{title.length}/200 caracteres</div>
            </div>

            <div className="form-group">
              <label htmlFor="content">Conteúdo</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva o conteúdo do seu post aqui..."
                disabled={saving}
                className="form-textarea"
                rows={12}
              />
              <div className="char-count">{content.length} caracteres</div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  disabled={saving}
                />
                <span className="checkmark"></span>
                Post publicado
              </label>
              <div className="help-text">
                {published 
                  ? 'O post está visível para todos os usuários' 
                  : 'O post está salvo como rascunho'}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!title.trim() || saving}
                className={`btn btn-primary ${saving ? 'loading' : ''}`}
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>

        <div className="post-preview">
          <h3>Pré-visualização</h3>
          <div className="preview-card">
            <div className="preview-header">
              <h4>{title || 'Título do post'}</h4>
              <div className="preview-meta">
                <span>Por: {user?.name}</span>
                <span>{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            <div className="preview-content">
              {content ? (
                <p>{content.substring(0, 200)}{content.length > 200 ? '...' : ''}</p>
              ) : (
                <p className="placeholder">Conteúdo do post aparecerá aqui...</p>
              )}
            </div>
            <div className="preview-status">
              Status: {published ? (
                <span className="status published">Publicado</span>
              ) : (
                <span className="status draft">Rascunho</span>
              )}
            </div>
          </div>
        </div>

        <div className="post-info">
          <h3>Informações do Post</h3>
          <div className="info-card">
            <div className="info-item">
              <strong>Criado em:</strong> {' '}
              {post?.createdAt ? (
                new Date(post.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              ) : (
                'Não disponível'
              )}
            </div>
            {post?.updatedAt && post.updatedAt !== post.createdAt && (
              <div className="info-item">
                <strong>Última atualização:</strong> {' '}
                {new Date(post.updatedAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
            <div className="info-item">
              <strong>ID do Post:</strong> {post?.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
