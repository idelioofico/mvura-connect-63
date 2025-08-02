import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  totalClients: number;
  ticketsByPriority: {
    low: number;
    medium: number;
    high: number;
  };
  ticketsByCategory: {
    [key: string]: number;
  };
  recentTickets: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    clientName: string;
    createdAt: string;
  }>;
}

export function useDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data;
    },
  });

  return {
    stats,
    isLoading,
  };
} 