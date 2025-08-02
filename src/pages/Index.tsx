
import { Ticket, Users, CheckCheck, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentTickets from '@/components/dashboard/RecentTickets';
import TicketsByCategory from '@/components/dashboard/TicketsByCategory';
import TicketTimeline from '@/components/dashboard/TicketTimeline';

const Dashboard = () => {
  return (
    <Layout 
      title="Dashboard" 
      description="Bem-vindo ao Mvura CRM, visualize métricas e informações importantes."
    >
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total de Clientes"
            value="1,234"
            change={5.8}
            trend="up"
            icon={Users}
            className="animate-slide-up animate-delay-100"
          />
          <StatCard
            title="Tickets Ativos"
            value="42"
            change={-2.3}
            trend="down"
            icon={Ticket}
            className="animate-slide-up animate-delay-200"
          />
          <StatCard
            title="Resolvidos (Mês)"
            value="156"
            change={12.5}
            trend="up"
            icon={CheckCheck}
            className="animate-slide-up animate-delay-300"
          />
          <StatCard
            title="Críticos"
            value="7"
            change={0}
            trend="neutral"
            icon={AlertCircle}
            className="animate-slide-up animate-delay-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TicketTimeline />
          <TicketsByCategory tickets={[]} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RecentTickets />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
