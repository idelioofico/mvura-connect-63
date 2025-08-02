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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Home, Calendar, ClipboardList } from 'lucide-react';
import { ClientWithTickets } from "@/types"

interface ClientDetailsModalProps {
  client: ClientWithTickets
  isOpen: boolean
  onClose: () => void
}

const ClientDetailsModal = ({ client, isOpen, onClose }: ClientDetailsModalProps) => {
  if (!client) return null;

  const statusColorMap = {
    'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Pendente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Inativo': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const contractTypeColorMap = {
    'Residencial': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Comercial': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Industrial': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes do Cliente</DialogTitle>
          <DialogDescription>
            Informações completas sobre o cliente.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold">{client.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={contractTypeColorMap[client.contractType]}>
                  {client.contractType}
                </Badge>
                <Badge variant="outline" className={statusColorMap[client.status]}>
                  {client.status}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="text-sm text-muted-foreground">NIF/NUIT</div>
                <div className="font-medium">{client.nif}</div>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-muted-foreground">Data de Início</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {client.startDate}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Informações de Contacto</h4>
              <div className="grid grid-cols-1 gap-2.5">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>{client.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Tickets Recentes</h4>
                <Button variant="outline" size="sm" className="h-8">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Ver Todos
                </Button>
              </div>
              <div className="text-sm text-muted-foreground text-center py-4">
                Total de Tickets: {client.tickets.length}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Editar Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailsModal;
