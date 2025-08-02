import { CommentWithUser } from "@/types"

const API_URL = import.meta.env.VITE_API_URL

export const commentService = {
  async getComments(ticketId: string): Promise<CommentWithUser[]> {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    return response.json()
  },

  async createComment(ticketId: string, content: string): Promise<CommentWithUser> {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return response.json()
  },

  async updateComment(commentId: string, content: string): Promise<CommentWithUser> {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    if (!response.ok) {
      throw new Error('Failed to update comment')
    }
    return response.json()
  },

  async deleteComment(commentId: string): Promise<void> {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete comment')
    }
  },
} 