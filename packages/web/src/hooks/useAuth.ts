import { useQuery } from '@tanstack/react-query';
import { authService, type User } from '@/services/api';

export function useAuth() {
  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useQuery<User>({
    queryKey: ['auth', 'user'],
    queryFn: authService.getCurrentUser,
    enabled: authService.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && authService.isAuthenticated(),
    error,
    refetch,
    login: authService.login,
    register: authService.register,
    logout: () => {
      authService.logout();
      window.location.href = '/';
    },
  };
}