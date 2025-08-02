import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Ticket } from '../types';

interface TicketFilters {
  status?: Ticket['status'];
  priority?: Ticket['priority'];
  clientId?: string;
  assignedToId?: string;
}

export function useTickets(filters?: TicketFilters) {
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets', filters],
    queryFn: async () => {
      const { data } = await api.get('/tickets', { params: filters });
      return data;
    },
  });

  const createTicket = useMutation({
    mutationFn: async (newTicket: Partial<Ticket>) => {
      const { data } = await api.post<Ticket>('/tickets', newTicket);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const updateTicket = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Ticket> & { id: string }) => {
      const { data } = await api.patch<Ticket>(`/tickets/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const deleteTicket = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tickets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  return {
    tickets,
    isLoading,
    createTicket: createTicket.mutate,
    updateTicket: updateTicket.mutate,
    deleteTicket: deleteTicket.mutate,
  };
} 