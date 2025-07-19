import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

//useContext: allows functional components to subscribe to React Context, 
// providing a way to share data across the component tree without prop drilling. (passing data through layers of components)

export const useAuth = () => useContext(AuthContext);
