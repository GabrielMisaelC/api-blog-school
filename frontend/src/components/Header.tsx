import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isTeacher, isStudent } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <a href="/">Blog Escolar</a>
          </h1>
          
          <nav className="nav">
            <a href="/" className="nav-link">Início</a>
            {isAuthenticated && isTeacher && (
              <>
                <a href="/create-post" className="nav-link">Criar Post</a>
                <a href="/admin" className="nav-link">Administrar</a>
              </>
            )}
            {isAuthenticated && isStudent && (
              <a href="/student-dashboard" className="nav-link">Minha Área</a>
            )}
          </nav>

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-info">
                <span className="welcome">
                  Olá, {user?.name}
                  {isTeacher && <span className="user-role"> (Professor)</span>}
                  {isStudent && <span className="user-role"> (Aluno)</span>}
                </span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Sair
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <a href="/login" className="btn btn-primary">Entrar</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
