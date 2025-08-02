import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineHeader, 
  TimelineIcon, 
  TimelineTitle, 
  TimelineBody,
  TimelineDescription
} from '@/components/ui/timeline';
import { UserCog, Edit, ClipboardCheck, UserCheck, FileText } from 'lucide-react';
import { ClientWithTickets } from "@/types"

interface ClientHistoryModalProps {
  client: ClientWithTickets
  isOpen: boolean
  onClose: () => void
}

const ClientHistoryModal = ({ client, isOpen, onClose }: ClientHistoryModalProps) => {
  if (!client) return null;

  const history = [
    {
      date: '25/10/2023 14:30',
      type: 'edit',
      title: 'Informações Atualizadas',
      description: 'Endereço e contacto atualizados por Maria Oliveira',
      icon: Edit,
    },
    {
      date: '15/07/2023 10:15',
      type: 'ticket',
      title: 'Ticket Criado #TK-1235',
      description: 'Ticket para "Falta de água" aberto',
      icon: FileText,
    },
    {
      date: '30/05/2023 09:45',
      type: 'status',
      title: 'Status Alterado',
      description: 'Status alterado de "Pendente" para "Ativo" por Carlos Santos',
      icon: ClipboardCheck,
    },
    {
      date: '15/03/2022 11:20',
      type: 'create',
      title: 'Cliente Criado',
      description: 'Novo cliente registrado por Pedro Lima',
      icon: UserCheck,
    },
  ];

  const getIconColor = (type: string) => {
    const colors = {
      'edit': 'text-blue-600 bg-blue-100',
      'ticket': 'text-purple-600 bg-purple-100',
      'status': 'text-green-600 bg-green-100',
      'create': 'text-orange-600 bg-orange-100',
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Histórico do Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Informações do Cliente</h3>
            <p>Nome: {client.name}</p>
            <p>Email: {client.email}</p>
            <p>Telefone: {client.phone}</p>
            <p>Endereço: {client.address}</p>
          </div>
          <div>
            <h3 className="font-semibold">Histórico de Tickets</h3>
            <div className="space-y-2">
              {client.tickets.map((ticket) => (
                <div key={ticket.id} className="border p-4 rounded-lg">
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-gray-500">Status: {ticket.status}</p>
                  <p className="text-sm text-gray-500">Prioridade: {ticket.priority}</p>
                  <p className="text-sm text-gray-500">
                    Data: {new Date(ticket.createdAt).toLocaleDateString()}
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

export default ClientHistoryModal;
