import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { MessageSquare, User, ClipboardList, Clock, AlertCircle } from 'lucide-react';
import { TicketWithRelations } from "@/types"

interface TicketDetailsModalProps {
  ticket: TicketWithRelations
  isOpen: boolean
  onClose: () => void
}

const TicketDetailsModal = ({ ticket, isOpen, onClose }: TicketDetailsModalProps) => {
  const [activeTab, setActiveTab] = React.useState('details');
  const [comment, setComment] = React.useState('');
  const [status, setStatus] = React.useState(ticket?.status || '');
  const [assignee, setAssignee] = React.useState(ticket?.assignee?.name || '');

  if (!ticket) return null;

  const ticketStatusMap = {
    'Aberto': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Em andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Resolvido': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Fechado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const ticketPriorityMap = {
    'Baixa': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Média': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Crítica': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    toast.success('Comentário adicionado com sucesso!');
    setComment('');
  };

  const handleUpdateStatus = () => {
    toast.success(`Status atualizado para ${status}!`);
  };

  const handleAssign = () => {
    toast.success(`Ticket atribuído para ${assignee}!`);
  };

  const comments = [
    {
      id: 1,
      user: {
        name: 'Maria Oliveira',
        avatar: '',
        initials: 'MO',
      },
      text: 'Equipe foi enviada para verificar o problema. Estimativa de resolução em 3 horas.',
      date: '28/11/2023 15:45',
    },
    {
      id: 2,
      user: {
        name: 'Carlos Santos',
        avatar: '',
        initials: 'CS',
      },
      text: 'Verificado vazamento na conexão principal. Será necessário substituir uma peça.',
      date: '28/11/2023 17:20',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Ticket</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Informações do Ticket</h3>
            <p>Título: {ticket.title}</p>
            <p>Descrição: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Prioridade: {ticket.priority}</p>
            <p>Data de Criação: {new Date(ticket.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Cliente</h3>
            <p>Nome: {ticket.client.name}</p>
            <p>Email: {ticket.client.email}</p>
            <p>Telefone: {ticket.client.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Atendente</h3>
            <p>Nome: {ticket.assignedTo.name}</p>
            <p>Email: {ticket.assignedTo.email}</p>
          </div>
          
          {/* Seção de Imagem */}
          {ticket.imageUrl && (
            <div>
              <h3 className="font-semibold">Imagem</h3>
              <div className="mt-2">
                <img 
                  src={ticket.imageUrl} 
                  alt="Imagem do ticket" 
                  className="max-w-full h-auto rounded-lg border border-border max-h-64 object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Seção de Localização */}
          {(ticket.latitude && ticket.longitude) && (
            <div>
              <h3 className="font-semibold">Localização</h3>
              <div className="mt-2 space-y-1">
                <p>Latitude: {ticket.latitude}</p>
                <p>Longitude: {ticket.longitude}</p>
                <a 
                  href={`https://maps.google.com/?q=${ticket.latitude},${ticket.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          )}
          <div>
            <h3 className="font-semibold">Comentários</h3>
            <div className="space-y-2">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="border p-4 rounded-lg">
                  <p className="font-medium">{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    Por: {comment.user.name} em {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;
