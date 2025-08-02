import { useState } from 'react';
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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, MoreHorizontal, Filter, Download, ArrowUpDown } from 'lucide-react';
import ClientDetailsModal from '@/components/clients/ClientDetailsModal';
import ClientEditModal from '@/components/clients/ClientEditModal';
import ClientHistoryModal from '@/components/clients/ClientHistoryModal';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';
import { toast } from 'sonner';
import { ClientWithTickets } from '@/types';

// Sample client data
const clients = [
  {
    id: '1',
    name: 'João Silva',
    nif: '123456789',
    address: 'Rua das Flores, 123, Chimoio',
    contact: '+258 84 123 4567',
    email: 'joao.silva@example.com',
    contractType: 'Residencial',
    startDate: '15/03/2022',
    status: 'Ativo',
  },
  {
    id: '2',
    name: 'Mercado Central Ltda',
    nif: '987654321',
    address: 'Av. Eduardo Mondlane, 456, Chimoio',
    contact: '+258 86 765 4321',
    email: 'contato@mercadocentral.co.mz',
    contractType: 'Comercial',
    startDate: '10/01/2021',
    status: 'Ativo',
  },
  {
    id: '3',
    name: 'Maria Cossa',
    nif: '456123789',
    address: 'Bairro 25 de Junho, 789, Chimoio',
    contact: '+258 84 987 6543',
    email: 'maria.cossa@example.com',
    contractType: 'Residencial',
    startDate: '22/07/2022',
    status: 'Pendente',
  },
  {
    id: '4',
    name: 'Indústrias Manica S.A.',
    nif: '789123456',
    address: 'Zona Industrial, Lote 45, Chimoio',
    contact: '+258 86 234 5678',
    email: 'contato@industriasmanica.co.mz',
    contractType: 'Industrial',
    startDate: '05/06/2020',
    status: 'Ativo',
  },
  {
    id: '5',
    name: 'Carlos Machava',
    nif: '654789123',
    address: 'Bairro 1º de Maio, 321, Chimoio',
    contact: '+258 84 345 6789',
    email: 'carlos.machava@example.com',
    contractType: 'Residencial',
    startDate: '18/11/2022',
    status: 'Inativo',
  },
  {
    id: '6',
    name: 'Hotel Zambeze',
    nif: '321456789',
    address: 'Av. dos Trabalhadores, 987, Chimoio',
    contact: '+258 86 876 5432',
    email: 'reservas@hotelzambeze.co.mz',
    contractType: 'Comercial',
    startDate: '30/09/2021',
    status: 'Ativo',
  },
  {
    id: '7',
    name: 'Ana Sitoe',
    nif: '567891234',
    address: 'Bairro Josina Machel, 654, Chimoio',
    contact: '+258 84 432 1098',
    email: 'ana.sitoe@example.com',
    contractType: 'Residencial',
    startDate: '12/02/2023',
    status: 'Ativo',
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  
  // Modal states
  const [selectedClient, setSelectedClient] = useState<ClientWithTickets | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.nif.includes(searchTerm) ||
    client.contact.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleClientAction = (action: string, client: ClientWithTickets) => {
    setSelectedClient(client);
    
    switch (action) {
      case 'details':
        setShowDetailsModal(true);
        break;
      case 'edit':
        setShowEditModal(true);
        break;
      case 'history':
        setShowHistoryModal(true);
        break;
      case 'create-ticket':
        setShowCreateTicketModal(true);
        break;
      case 'deactivate':
        handleDeactivateClient(client);
        break;
      default:
        break;
    }
  };

  const handleDeactivateClient = (client: ClientWithTickets) => {
    // In a real app, this would call an API
    toast.success(`Cliente ${client.name} foi desativado.`);
  };

  return (
    <Layout title="Clientes" description="Gerencie todos os clientes da Águas da Região Centro.">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, NIF, e-mail..."
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
                  Tipo de Contrato
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Status
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Data de Início
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Dialog open={showAddClientDialog} onOpenChange={setShowAddClientDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do cliente abaixo. Todos os campos marcados com * são obrigatórios.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome/Razão Social *</Label>
                      <Input id="name" placeholder="Nome completo ou razão social" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nif">NIF/NUIT *</Label>
                      <Input id="nif" placeholder="Número de identificação fiscal" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço *</Label>
                    <Input id="address" placeholder="Endereço completo" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contacto *</Label>
                      <Input id="contact" placeholder="Número de telefone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" placeholder="exemplo@email.com" type="email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractType">Tipo de Contrato *</Label>
                      <Select>
                        <SelectTrigger id="contractType">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residencial</SelectItem>
                          <SelectItem value="commercial">Comercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data de Início *</Label>
                      <Input id="startDate" placeholder="DD/MM/AAAA" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowAddClientDialog(false)}>
                    Cancelar
                  </Button>
                  <Button>Salvar Cliente</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border animate-slide-up">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Nome/Razão Social</span>
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Contacto</TableHead>
                <TableHead className="hidden md:table-cell">Contrato</TableHead>
                <TableHead className="hidden lg:table-cell">Data de Início</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id} className="transition-all hover:bg-muted/30">
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.nif}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <p>{client.contact}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className={contractTypeColorMap[client.contractType]}>
                        {client.contractType}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{client.startDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColorMap[client.status]}>
                        {client.status}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleClientAction('details', client)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleClientAction('edit', client)}>
                            Editar cliente
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleClientAction('history', client)}>
                            Ver histórico
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleClientAction('create-ticket', client)}>
                            Criar ticket
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleClientAction('deactivate', client)}
                          >
                            Desativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2">
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

      {/* Client Action Modals */}
      <ClientDetailsModal 
        open={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)}
        client={selectedClient}
      />
      
      <ClientEditModal 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)}
        client={selectedClient}
      />
      
      <ClientHistoryModal 
        open={showHistoryModal} 
        onClose={() => setShowHistoryModal(false)}
        client={selectedClient}
      />
      
      <CreateTicketModal 
        open={showCreateTicketModal} 
        onClose={() => setShowCreateTicketModal(false)}
        clientId={selectedClient?.id}
        clientName={selectedClient?.name}
      />
    </Layout>
  );
};

export default Clients;
