import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import type { User, AuthResponse } from '../types';

export function useAuth() {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('mvura_token');
      if (!token) return null;
      
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
  });

  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('mvura_token', data.token);
      return data.user;
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const logout = () => {
    localStorage.removeItem('mvura_token');
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login: login.mutate,
    logout,
    isAuthenticated: !!user,
  };
} 