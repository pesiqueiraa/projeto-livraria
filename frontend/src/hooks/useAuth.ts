import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    // Verificar se há token no localStorage ao carregar
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        token,
        isLoading: false
      }));
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Aqui você fará a chamada real para sua API
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Salvar token no localStorage
      localStorage.setItem('token', data.token);
      
      setAuthState({
        isAuthenticated: true,
        token: data.token,
        user: data.user,
        isLoading: false
      });

      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};
