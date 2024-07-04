import { Home, Auth } from './components';
import { AuthProvider, useAuth } from './context_providers/auth_provider';
import { MyThemeProvider } from './context_providers/theme_provider';

import {
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <MyThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <MainPage />
        </AuthProvider>
      </BrowserRouter>
    </MyThemeProvider>
  );
}

const MainPage = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Home /> : <Auth />;
};

export default App;
