
import { useState } from 'react';
import {
  Search,
  Plus,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  UserX,
  Key,
  Shield,
  Calendar,
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
  TableRow,
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
import { Card, CardContent } from '@/components/ui/card';

// Sample user data
const users = [
  {
    id: 1,
    name: 'Admin Sistema',
    email: 'admin@aguas.co.mz',
    role: 'Administrador',
    status: 'Ativo',
    lastActive: '2023-11-28T10:23:45',
    avatar: '',
    initials: 'AS',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@aguas.co.mz',
    role: 'Atendente',
    status: 'Ativo',
    lastActive: '2023-11-28T09:15:22',
    avatar: '',
    initials: 'MO',
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos.santos@aguas.co.mz',
    role: 'Atendente',
    status: 'Ativo',
    lastActive: '2023-11-27T16:45:12',
    avatar: '',
    initials: 'CS',
  },
  {
    id: 4,
    name: 'Pedro Lima',
    email: 'pedro.lima@aguas.co.mz',
    role: 'Atendente',
    status: 'Inativo',
    lastActive: '2023-11-15T14:30:10',
    avatar: '',
    initials: 'PL',
  },
  {
    id: 5,
    name: 'Luísa Fernandes',
    email: 'luisa.fernandes@aguas.co.mz',
    role: 'Atendente',
    status: 'Ativo',
    lastActive: '2023-11-28T08:05:30',
    avatar: '',
    initials: 'LF',
  },
  {
    id: 6,
    name: 'Rafael Mendes',
    email: 'rafael.mendes@aguas.co.mz',
    role: 'Supervisor',
    status: 'Ativo',
    lastActive: '2023-11-27T18:20:45',
    avatar: '',
    initials: 'RM',
  },
];

const UserRoleIcons = {
  Administrador: <Shield className="h-4 w-4 text-red-500" />,
  Supervisor: <UserCheck className="h-4 w-4 text-purple-500" />,
  Atendente: <UserPlus className="h-4 w-4 text-blue-500" />,
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

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColorMap: Record<string, string> = {
    'Ativo': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Inativo': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Layout title="Usuários" description="Gerencie todos os usuários do sistema.">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar usuários..."
              className="pl-8 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do novo usuário abaixo. A senha será enviada para o e-mail informado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Nome do usuário" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="attendant">Atendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Permissões</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm_clients" className="rounded text-mvura-600 focus:ring-mvura-500" />
                          <Label htmlFor="perm_clients" className="text-sm cursor-pointer">Gerenciar Clientes</Label>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm_tickets" className="rounded text-mvura-600 focus:ring-mvura-500" />
                          <Label htmlFor="perm_tickets" className="text-sm cursor-pointer">Gerenciar Chamados</Label>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm_reports" className="rounded text-mvura-600 focus:ring-mvura-500" />
                          <Label htmlFor="perm_reports" className="text-sm cursor-pointer">Visualizar Relatórios</Label>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm_users" className="rounded text-mvura-600 focus:ring-mvura-500" />
                          <Label htmlFor="perm_users" className="text-sm cursor-pointer">Gerenciar Usuários</Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowNewUserDialog(false)}>
                  Adicionar Usuário
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border animate-slide-up overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Usuário</TableHead>
                <TableHead className="w-[150px]">Função</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Último Acesso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="transition-all hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : null}
                          <AvatarFallback className={`${user.role === 'Administrador' ? 'bg-red-100 text-red-700' : user.role === 'Supervisor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {UserRoleIcons[user.role as keyof typeof UserRoleIcons]}
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatDate(user.lastActive)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColorMap[user.status]}>
                        {user.status}
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
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Redefinir senha
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Editar permissões
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'Ativo' ? (
                            <DropdownMenuItem className="text-red-600">
                              <UserX className="h-4 w-4 mr-2" />
                              Desativar usuário
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <UserCheck className="h-4 w-4 mr-2" />
                              Ativar usuário
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
