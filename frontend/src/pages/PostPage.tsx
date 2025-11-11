import React, { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { postsAPI, commentsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './PostPage.css';

interface PostPageProps {
  postId: number;
}

const PostPage: React.FC<PostPageProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);
  
  const { user, isAuthenticated } = useAuth();

  const loadPost = React.useCallback(async () => {
    try {
      const postData = await postsAPI.getPostById(postId);
      setPost(postData);
    } catch (err) {
      setError('Post não encontrado ou erro ao carregar');
      console.error('Erro ao carregar post:', err);
    }
  }, [postId]);

  const loadComments = React.useCallback(async () => {
    try {
      // Como não há endpoint específico para comentários por post,
      // vamos filtrar todos os comentários
      const allComments = await commentsAPI.getAllComments();
      const postComments = allComments.filter(comment => comment.postid === postId);
      setComments(postComments);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadPost();
    loadComments();
  }, [loadPost, loadComments]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!commentContent.trim() || !user) return;

    setSubmittingComment(true);
    try {
      const newComment = await commentsAPI.createComment({
        content: commentContent.trim(),
        postid: postId,
        personid: user.id
      });
      
      setComments([...comments, newComment]);
      setCommentContent('');
    } catch (err) {
      console.error('Erro ao criar comentário:', err);
      alert('Erro ao adicionar comentário');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error">
          {error || 'Post não encontrado'}
          <br />
          <a href="/" className="back-link">← Voltar ao início</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="post-page">
        <nav className="breadcrumb">
          <a href="/">Início</a> <span>›</span> <span>{post.title}</span>
        </nav>

        <article className="post-detail">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="author-info">
                <span className="author">Por: {post.person?.name || 'Autor não identificado'}</span>
                {post.createdAt && (
                  <span className="date">
                    Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="post-content">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            ) : (
              <p>Conteúdo não disponível</p>
            )}
          </div>
        </article>

        <section className="comments-section">
          <h2 className="comments-title">
            Comentários ({comments.length})
          </h2>

          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="form-group">
                <label htmlFor="comment">Deixe seu comentário:</label>
                <textarea
                  id="comment"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={4}
                  placeholder="Digite seu comentário aqui..."
                  disabled={submittingComment}
                  className="comment-textarea"
                />
              </div>
              <button
                type="submit"
                disabled={!commentContent.trim() || submittingComment}
                className="btn btn-primary"
              >
                {submittingComment ? 'Enviando...' : 'Comentar'}
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>
                <a href="/login">Faça login</a> para deixar um comentário.
              </p>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">
                Ainda não há comentários neste post.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.person?.name || 'Usuário não identificado'}
                    </span>
                    {comment.createdAt && (
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostPage;
