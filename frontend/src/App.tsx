import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Componente para extrair ID da URL
const PostPageWrapper: React.FC = () => {
  const pathname = window.location.pathname;
  const postId = parseInt(pathname.split('/')[2]);
  return <PostPage postId={postId} />;
};

const EditPostPageWrapper: React.FC = () => {
  const pathname = window.location.pathname;
  const postId = parseInt(pathname.split('/')[2]);
  return <EditPostPage postId={postId} />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/post/:id" element={<PostPageWrapper />} />
              
              {/* Área do Aluno */}
              <Route 
                path="/student-dashboard" 
                element={
                  <ProtectedRoute requireStudent>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rotas exclusivas para Professores */}
              <Route 
                path="/create-post" 
                element={
                  <ProtectedRoute requireTeacher>
                    <CreatePostPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-post/:id" 
                element={
                  <ProtectedRoute requireTeacher>
                    <EditPostPageWrapper />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireTeacher>
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
              {/* Rota 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

// Componente para páginas não encontradas
const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <div className="not-found">
        <h1>404 - Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/" className="btn btn-primary">
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

// Componente Footer
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Blog Escolar. Todos os direitos reservados.</p>
          <p>Desenvolvido para facilitar o compartilhamento de conhecimento entre docentes e alunos.</p>
        </div>
      </div>
    </footer>
  );
};

export default App;
