
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const ticketStatusMap = {
  'aberto': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'em andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'resolvido': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'fechado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const ticketPriorityMap = {
  'baixa': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'média': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'alta': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'crítica': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

type Ticket = {
  id: string;
  title: string;
  client: string;
  status: 'aberto' | 'em andamento' | 'resolvido' | 'fechado';
  priority: 'baixa' | 'média' | 'alta' | 'crítica';
  created: string;
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
};

const RecentTickets = () => {
  const [activeTab, setActiveTab] = useState('recentes');

  const tickets: Ticket[] = [
    {
      id: 'TK-1234',
      title: 'Falta de água na Rua das Flores',
      client: 'João Silva',
      status: 'aberto',
      priority: 'alta',
      created: '2h atrás',
      assignee: {
        name: 'Maria Oliveira',
        initials: 'MO',
      },
    },
    {
      id: 'TK-1235',
      title: 'Vazamento na rua principal',
      client: 'Empresa ABC',
      status: 'em andamento',
      priority: 'crítica',
      created: '3h atrás',
      assignee: {
        name: 'Carlos Santos',
        initials: 'CS',
      },
    },
    {
      id: 'TK-1236',
      title: 'Qualidade da água (cor marrom)',
      client: 'Ana Pereira',
      status: 'resolvido',
      priority: 'média',
      created: '5h atrás',
      assignee: {
        name: 'Pedro Lima',
        initials: 'PL',
      },
    },
    {
      id: 'TK-1237',
      title: 'Problemas no contador de água',
      client: 'Mercado Central',
      status: 'fechado',
      priority: 'baixa',
      created: '1d atrás',
      assignee: {
        name: 'Luísa Fernandes',
        initials: 'LF',
      },
    },
  ];

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle>Tickets Recentes</CardTitle>
        <CardDescription>
          Visualize e gerencie tickets recentes no sistema.
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="recentes" onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="recentes">Recentes</TabsTrigger>
            <TabsTrigger value="meus">Meus Tickets</TabsTrigger>
            <TabsTrigger value="criticos">Críticos</TabsTrigger>
          </TabsList>
        </div>
        <CardContent className="p-0 pt-4">
          <TabsContent value="recentes" className="m-0">
            <div className="space-y-0.5">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{ticket.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{ticket.id}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{ticket.client}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{ticket.created}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={cn(ticketPriorityMap[ticket.priority], 'capitalize')}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline" className={cn(ticketStatusMap[ticket.status], 'capitalize')}>
                      {ticket.status}
                    </Badge>
                    {ticket.assignee && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-8 w-8">
                              {ticket.assignee.avatar ? (
                                <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                              ) : null}
                              <AvatarFallback className="bg-mvura-100 text-mvura-700">
                                {ticket.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Atribuído a: {ticket.assignee.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <Button variant="ghost" size="icon" className="ml-2">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" className="w-full">Ver todos os tickets</Button>
            </div>
          </TabsContent>
          <TabsContent value="meus" className="m-0">
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Seus tickets atribuídos aparecerão aqui.</p>
            </div>
          </TabsContent>
          <TabsContent value="criticos" className="m-0">
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Tickets críticos aparecerão aqui.</p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default RecentTickets;
