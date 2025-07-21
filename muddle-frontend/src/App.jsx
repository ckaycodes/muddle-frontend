import { AuthProvider } from './context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './navigation/routes';


function App() {
  return (
    <AuthProvider> 
      <AppRoutes/>
    </AuthProvider>
    
  );
}

export default App;


