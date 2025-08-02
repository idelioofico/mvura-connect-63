import { useAuth } from './useAuth';
import { ROLE_PERMISSIONS, type Permission } from '../types';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role];
    return userPermissions.includes(permission as typeof userPermissions[number]);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isAtendente = (): boolean => {
    return user?.role === 'atendente';
  };

  return {
    hasPermission,
    isAdmin,
    isAtendente,
    userRole: user?.role
  };
} 