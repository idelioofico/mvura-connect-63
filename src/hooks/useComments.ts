import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Comment } from '../types';

export function useComments(ticketId: string) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', ticketId],
    queryFn: async () => {
      const { data } = await api.get(`/tickets/${ticketId}/comments`);
      return data;
    },
  });

  const addComment = useMutation({
    mutationFn: async (content: string) => {
      const { data } = await api.post(`/tickets/${ticketId}/comments`, { content });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', ticketId] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId: string) => {
      await api.delete(`/tickets/${ticketId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', ticketId] });
    },
  });

  return {
    comments,
    isLoading,
    addComment: addComment.mutate,
    deleteComment: deleteComment.mutate,
  };
} 