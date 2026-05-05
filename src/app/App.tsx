import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider, useAuth } from './context/auth-context';
import { LoginPage } from './pages/auth/login-page';

function AppInner() {
  const { user } = useAuth();
  if (!user) return <LoginPage />;
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}