import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      
      // Redirecionar baseado no tipo de usuário
      if (user.isTeacher) {
        window.location.href = '/admin';
      } else if (user.isStudent) {
        window.location.href = '/student-dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h1>Entrar</h1>
            <p>Faça login para acessar o sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="seu.email@escola.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Sua senha"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Apenas professores podem fazer login para criar e gerenciar posts.
            </p>
            <a href="/" className="back-link">← Voltar ao início</a>
          </div>
        </div>

        <div className="demo-credentials">
          <h3>Credenciais de Demonstração</h3>
          <div className="credentials-section">
            <div className="credential-item">
              <p><strong>Professor:</strong></p>
              <p>E-mail: professor@escola.com</p>
              <p>Senha: professor123</p>
            </div>
            <div className="credential-item">
              <p><strong>Aluno:</strong></p>
              <p>E-mail: aluno@escola.com</p>
              <p>Senha: aluno123</p>
            </div>
          </div>
          <p><em>Nota: Estas são credenciais fictícias para demonstração</em></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
