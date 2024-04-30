import './App.css';
import { Home, Auth } from './components';
import { AuthProvider, useAuth } from './context_providers/auth_provider';

import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const MainPage = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Home /> : <Auth />;
};

export default App;
