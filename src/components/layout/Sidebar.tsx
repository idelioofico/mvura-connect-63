
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Users,
  Ticket,
  Home,
  User,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Settings,
  LogOut
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

type SidebarItem = {
  title: string;
  path: string;
  icon: JSX.Element;
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: 'Clientes',
      path: '/clientes',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Chamados',
      path: '/chamados',
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: 'Relatórios',
      path: '/relatorios',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: 'Usuários',
      path: '/usuarios',
      icon: <User className="h-5 w-5" />,
    },
    {
      title: 'Configurações',
      path: '/configuracoes',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-mvura-500 flex items-center justify-center animate-fade-in">
            <span className="font-bold text-white text-lg">M</span>
            <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {!collapsed && (
            <h1 className="ml-3 font-bold text-xl text-card-foreground animate-fade-in">
              Mvura<span className="text-mvura-500">CRM</span>
            </h1>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("rounded-full", collapsed && "absolute right-0 -mr-4 bg-card border shadow-sm")}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 overflow-auto py-6 px-3">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-mvura-100 text-mvura-700 dark:bg-mvura-950 dark:text-mvura-300"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "mr-3",
                    collapsed && "mr-0",
                    isActive && "text-mvura-600 dark:text-mvura-400"
                  )}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="animate-fade-in">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Admin" />
                <AvatarFallback className="bg-mvura-200 text-mvura-700">AD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">admin@mvura.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
