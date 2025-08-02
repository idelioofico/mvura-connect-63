import { useState } from 'react';
import { 
  Filter, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Download,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TicketDetailsModal from '@/components/tickets/TicketDetailsModal';
import { toast } from 'sonner';
import { TicketWithRelations } from '@/types';

const ticketStatusMap: Record<string, string> = {
  'Aberto': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Em andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Resolvido': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Fechado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const ticketPriorityMap: Record<string, string> = {
  'Baixa': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Média': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Crítica': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

// Sample ticket data
const tickets = [
  {
    id: 'TK-1001',
    title: 'Falta de água na residência há 2 dias',
    client: {
      name: 'João Silva',
      id: 'CL-123',
    },
    category: 'Falta de Água',
    priority: 'Alta',
    status: 'Aberto',
    created: '2023-11-28T08:30:00',
    assignee: {
      name: 'Maria Oliveira',
      avatar: '',
      initials: 'MO',
    },
  },
  {
    id: 'TK-1002',
    title: 'Vazamento na rua principal perto do mercado',
    client: {
      name: 'Prefeitura Municipal',
      id: 'CL-456',
    },
    category: 'Vazamento Visível',
    priority: 'Crítica',
    status: 'Em andamento',
    created: '2023-11-27T14:45:00',
    assignee: {
      name: 'Carlos Santos',
      avatar: '',
      initials: 'CS',
    },
  },
  {
    id: 'TK-1003',
    title: 'Água com coloração marrom',
    client: {
      name: 'Ana Pereira',
      id: 'CL-789',
    },
    category: 'Qualidade da Água',
    priority: 'Média',
    status: 'Resolvido',
    created: '2023-11-25T10:15:00',
    assignee: {
      name: 'Pedro Lima',
      avatar: '',
      initials: 'PL',
    },
  },
  {
    id: 'TK-1004',
    title: 'Contador apresentando valores incorretos',
    client: {
      name: 'Mercado Central',
      id: 'CL-321',
    },
    category: 'Problemas no Contador',
    priority: 'Baixa',
    status: 'Fechado',
    created: '2023-11-20T16:30:00',
    assignee: {
      name: 'Luísa Fernandes',
      avatar: '',
      initials: 'LF',
    },
  },
  {
    id: 'TK-1005',
    title: 'Pressão da água muito baixa',
    client: {
      name: 'Hotel Zambeze',
      id: 'CL-654',
    },
    category: 'Baixa Pressão da Água',
    priority: 'Média',
    status: 'Em andamento',
    created: '2023-11-24T09:20:00',
    assignee: {
      name: 'Rafael Mendes',
      avatar: '',
      initials: 'RM',
    },
  },
  {
    id: 'TK-1006',
    title: 'Fatura com valor acima do normal',
    client: {
      name: 'Maria Cossa',
      id: 'CL-987',
    },
    category: 'Problemas no Contador',
    priority: 'Média',
    status: 'Aberto',
    created: '2023-11-26T11:05:00',
    assignee: null,
  },
  {
    id: 'TK-1007',
    title: 'Vazamento na conexão do contador',
    client: {
      name: 'Carlos Machava',
      id: 'CL-543',
    },
    category: 'Vazamento Visível',
    priority: 'Alta',
    status: 'Aberto',
    created: '2023-11-27T13:40:00',
    assignee: null,
  },
];

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

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTicketDialog, setShowNewTicketDialog] = useState(false);
  
  // Modal states
  const [selectedTicket, setSelectedTicket] = useState<TicketWithRelations | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Filter tickets based on search term
  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTicketAction = (action: string, ticket: TicketWithRelations) => {
    setSelectedTicket(ticket);
    
    switch (action) {
      case 'details':
        setShowDetailsModal(true);
        break;
      case 'update-status':
        // This will be handled in the details modal now
        setShowDetailsModal(true);
        break;
      case 'assign':
        // This will be handled in the details modal now
        setShowDetailsModal(true);
        break;
      case 'add-comment':
        // This will be handled in the details modal now
        setShowDetailsModal(true);
        break;
      case 'close':
        handleCloseTicket(ticket);
        break;
      default:
        break;
    }
  };

  const handleCloseTicket = (ticket: TicketWithRelations) => {
    // In a real app, this would call an API
    toast.success(`Ticket ${ticket.id} foi fechado.`);
  };

  const [tickets, setTickets] = useState<TicketWithRelations[]>([]);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    clientId: '',
    priority: 'MEDIUM'
  });

  const createTicket = async () => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
      });
      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
      const ticket = await response.json();
      setTickets([...tickets, ticket]);
      setNewTicket({
        title: '',
        description: '',
        clientId: '',
        priority: 'MEDIUM'
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }
      const updatedTicket = await response.json();
      setTickets(tickets.map(ticket => 
        ticket.id === ticketId ? updatedTicket : ticket
      ));
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <Layout title="Tickets" description="Gerencie todos os tickets de suporte.">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar tickets..."
              className="pl-8 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Status
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Prioridade
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Categoria
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Atendente
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Data de criação
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Dialog open={showNewTicketDialog} onOpenChange={setShowNewTicketDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Chamado
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Criar Novo Chamado</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes do chamado abaixo. Todos os campos marcados com * são obrigatórios.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente *</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cl-123">João Silva</SelectItem>
                        <SelectItem value="cl-456">Prefeitura Municipal</SelectItem>
                        <SelectItem value="cl-789">Ana Pereira</SelectItem>
                        <SelectItem value="cl-321">Mercado Central</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Chamado *</Label>
                    <Input id="title" placeholder="Descreva o problema brevemente" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="falta-agua">Falta de Água</SelectItem>
                          <SelectItem value="problema-contador">Problemas no Contador</SelectItem>
                          <SelectItem value="qualidade-agua">Qualidade da Água</SelectItem>
                          <SelectItem value="vazamento">Vazamento Visível</SelectItem>
                          <SelectItem value="pressao-baixa">Baixa Pressão da Água</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridade *</Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="critica">Crítica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Atribuir para</Label>
                    <Select>
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Selecione um atendente (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mo">Maria Oliveira</SelectItem>
                        <SelectItem value="cs">Carlos Santos</SelectItem>
                        <SelectItem value="pl">Pedro Lima</SelectItem>
                        <SelectItem value="lf">Luísa Fernandes</SelectItem>
                        <SelectItem value="rm">Rafael Mendes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição Detalhada *</Label>
                    <Textarea id="description" placeholder="Forneça detalhes sobre o problema" rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewTicketDialog(false)}>
                    Cancelar
                  </Button>
                  <Button>Criar Chamado</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border animate-slide-up overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center space-x-1">
                    <span>ID</span>
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead>Título/Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Prioridade</TableHead>
                <TableHead className="hidden lg:table-cell">
                  <div className="flex items-center space-x-1">
                    <span>Data</span>
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Atendente</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="transition-all hover:bg-muted/30">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-muted-foreground">{ticket.client.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{ticket.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={ticketStatusMap[ticket.status]}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className={ticketPriorityMap[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(ticket.created)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {ticket.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {ticket.assignee.avatar ? (
                              <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                            ) : null}
                            <AvatarFallback className="bg-mvura-100 text-mvura-700">
                              {ticket.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{ticket.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Não atribuído</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleTicketAction('details', ticket)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTicketAction('update-status', ticket)}>
                            Atualizar status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTicketAction('assign', ticket)}>
                            Atribuir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTicketAction('add-comment', ticket)}>
                            Adicionar comentário
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleTicketAction('close', ticket)}
                          >
                            Fechar ticket
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum ticket encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <strong>{filteredTickets.length}</strong> de <strong>{tickets.length}</strong> tickets
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="px-4 font-medium">
              1
            </Button>
            <Button variant="outline" size="sm">
              Próxima
            </Button>
          </div>
        </div>
      </div>

      {/* Ticket Action Modals */}
      <TicketDetailsModal 
        open={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)}
        ticket={selectedTicket}
      />
    </Layout>
  );
};

export default Tickets;
