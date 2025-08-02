import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../context/ProtectedRoute'; 
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import StoriesPage from '../pages/StoriesPage';
import LoginPage from '../pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import ProfilesListPage from '../pages/ProfileListPage';
import ProfileDetailPage from '../pages/ProfileDetailPage';
import HomePage from '../pages/HomePage';
import StoryDetailPage from '../pages/StoryDetailPage';

export default function AppRoutes() { 
    return (
    <> 
    <ToastContainer />
      <Routes>
          <Route path="/" element={<Layout><Navigate to="/homePage" /> </Layout>} />
          <Route path="/homePage" element={<Layout><HomePage/></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/login" element={<Layout> <LoginPage /> </Layout>} /> 
          
          <Route path="/stories" element={
            <ProtectedRoute>
              <Layout> <StoriesPage /> </Layout>
            </ProtectedRoute>} />

          <Route path="/stories/:id" element={
            <ProtectedRoute>
              <Layout> <StoryDetailPage/> </Layout>
            </ProtectedRoute>} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout> <ProfilePage /> </Layout>
            </ProtectedRoute>} />

          <Route path="/profileList" element={ 
            <ProtectedRoute> 
              <Layout> <ProfilesListPage/> </Layout>
            </ProtectedRoute>} />

            <Route path="/profile/:id" element={ 
            <ProtectedRoute> 
              <Layout> <ProfileDetailPage/> </Layout>
            </ProtectedRoute>} />
      </Routes>
  </>
    );
}