import { Link } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';

export function Navigation() {
  const { hasPermission } = usePermissions();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
      permission: 'view_reports' as const
    },
    {
      label: 'Tickets',
      path: '/tickets',
      permission: 'manage_tickets' as const
    },
    {
      label: 'Clientes',
      path: '/clients',
      permission: 'view_clients' as const
    },
    {
      label: 'Usuários',
      path: '/users',
      permission: 'manage_users' as const
    },
    {
      label: 'Configurações',
      path: '/settings',
      permission: 'manage_settings' as const
    }
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => 
        hasPermission(item.permission) ? (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            {item.label}
          </Link>
        ) : null
      )}
    </nav>
  );
} 