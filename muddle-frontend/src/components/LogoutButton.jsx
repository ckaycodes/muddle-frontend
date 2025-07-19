//TODO -- Update after we implement AuthProvider.jsx

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const LogoutButton = () => {
  const navigate = useNavigate();
  const {logout } = useAuth();


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
