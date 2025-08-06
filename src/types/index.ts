export type UserRole = 'admin' | 'atendente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Definição das permissões por role
export const ROLE_PERMISSIONS = {
  admin: [
    'manage_users',
    'manage_clients',
    'manage_tickets',
    'view_reports',
    'manage_settings'
  ],
  atendente: [
    'view_clients',
    'manage_tickets',
    'view_reports'
  ]
} as const;

// Extrair todas as permissões possíveis dos roles
type AdminPermissions = typeof ROLE_PERMISSIONS['admin'][number];
type AtendentePermissions = typeof ROLE_PERMISSIONS['atendente'][number];
export type Permission = AdminPermissions | AtendentePermissions;

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  clientId: string;
  assignedToId?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  ticketId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface UserWithRole extends User {
  role: 'ADMIN' | 'ATTENDANT'
}

export interface ClientWithTickets extends Client {
  tickets: Ticket[]
}

export interface TicketWithRelations extends Ticket {
  client: Client
  assignedTo: User
  comments: Comment[]
}

export interface CommentWithUser extends Comment {
  user: User
}

export interface DashboardStats {
  totalTickets: number
  openTickets: number
  closedTickets: number
  totalClients: number
  ticketsByStatus: Record<string, number>
  ticketsByPriority: Record<string, number>
}

export interface ReportData {
  startDate: Date
  endDate: Date
  totalTickets: number
  ticketsByStatus: Record<string, number>
  ticketsByPriority: Record<string, number>
  averageResolutionTime: number
  ticketsByAttendant: Record<string, number>
}