import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../context/ProtectedRoute'; 
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import StoriesPage from '../pages/StoriesPage';
import UsersPage from '../pages/UsersPage';
import LoginPage from '../pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';

export default function AppRoutes() { 
    return (
    <> 
    <ToastContainer />
      <Routes>
          <Route path="/" element={<Layout><Navigate to="/login" /> </Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/users" element={<Layout> <UsersPage /></Layout>} />
          <Route path="/login" element={<Layout> <LoginPage /> </Layout>} /> 
          <Route path="/stories" element={
            <ProtectedRoute>
              <Layout> <StoriesPage /> </Layout>
            </ProtectedRoute>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout> <ProfilePage /> </Layout>
            </ProtectedRoute>} />
      </Routes>
  </>
    );
}