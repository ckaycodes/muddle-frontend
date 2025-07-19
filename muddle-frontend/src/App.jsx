import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute'; 
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import StoriesPage from './pages/StoriesPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar'; 
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: Put all routing in seperate jsx file

function App() {
  return (
    <AuthProvider> 
    <Router>
      <div>
      <NavBar /> {/* shows on every page */}
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;


