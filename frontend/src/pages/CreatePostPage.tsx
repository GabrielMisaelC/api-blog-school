import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postsAPI } from '../services/api';
import './CreatePostPage.css';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [published, setPublished] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  
  const { user, isAuthenticated, isTeacher } = useAuth();

  // Verificar se o usuário está autenticado e é professor
  if (!isAuthenticated || !isTeacher) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Apenas professores autenticados podem criar posts.</p>
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

    if (!user) {
      setError('Usuário não identificado');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await postsAPI.createPost({
        title: title.trim(),
        content: content.trim() || undefined,
        published,
        personid: user.id
      });

      setSuccess(true);
      setTitle('');
      setContent('');
      setPublished(true);
      
      // Redirecionar após alguns segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar o post');
      console.error('Erro ao criar post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm('Você tem alterações não salvas. Deseja realmente cancelar?')) {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="container">
      <div className="create-post-page">
        <div className="page-header">
          <h1>Criar Nova Postagem</h1>
          <p>Compartilhe seu conhecimento com a comunidade escolar</p>
        </div>

        {success && (
          <div className="success-message">
            <h3>Post criado com sucesso!</h3>
            <p>Redirecionando para a página principal...</p>
          </div>
        )}

        <div className="create-post-form">
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
                disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Publicar imediatamente
              </label>
              <div className="help-text">
                {published 
                  ? 'O post será visível para todos os usuários' 
                  : 'O post será salvo como rascunho'}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!title.trim() || loading}
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Salvando...' : (published ? 'Publicar Post' : 'Salvar Rascunho')}
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
                <span className="status published">Será publicado</span>
              ) : (
                <span className="status draft">Será salvo como rascunho</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
