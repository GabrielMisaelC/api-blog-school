import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireTeacher?: boolean;
  requireStudent?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireTeacher = false,
  requireStudent = false
}) => {
  const { isAuthenticated, isTeacher, isStudent } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Você precisa estar logado para acessar esta página.</p>
          <div className="action-buttons">
            <a href="/login" className="btn btn-primary">Fazer Login</a>
            <a href="/" className="btn btn-outline">Voltar ao Início</a>
          </div>
        </div>
      </div>
    );
  }

  if (requireTeacher && !isTeacher) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Apenas professores podem acessar esta página.</p>
          <div className="action-buttons">
            <a href="/" className="btn btn-primary">Voltar ao Início</a>
          </div>
        </div>
      </div>
    );
  }

  if (requireStudent && !isStudent) {
    return (
      <div className="container">
        <div className="access-denied">
          <h1>Acesso Negado</h1>
          <p>Esta área é exclusiva para alunos.</p>
          <div className="action-buttons">
            <a href="/" className="btn btn-primary">Voltar ao Início</a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
