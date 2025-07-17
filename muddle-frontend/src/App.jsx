import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute'; 
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import StoriesPage from './pages/StoriesPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar'; 



function App() {
  return (
    <Router>
      <div>
      <NavBar /> {/* ⬅️ shows on every page */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


