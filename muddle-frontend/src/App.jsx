import { AuthProvider } from './context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './navigation/routes';
import './styles/global.css';
import './styles/index.css';

function App() {
  return (
    <AuthProvider> 
      <AppRoutes/>
    </AuthProvider>
    
  );
}

export default App;


