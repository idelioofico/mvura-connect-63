import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketWithRelations } from "@/types"

interface TicketTimelineProps {
  tickets: TicketWithRelations[]
}

const data = [
  { name: 'Jan', abertos: 40, resolvidos: 24 },
  { name: 'Fev', abertos: 30, resolvidos: 29 },
  { name: 'Mar', abertos: 20, resolvidos: 22 },
  { name: 'Abr', abertos: 27, resolvidos: 25 },
  { name: 'Mai', abertos: 18, resolvidos: 20 },
  { name: 'Jun', abertos: 23, resolvidos: 22 },
  { name: 'Jul', abertos: 34, resolvidos: 30 },
  { name: 'Ago', abertos: 33, resolvidos: 25 },
  { name: 'Set', abertos: 28, resolvidos: 27 },
  { name: 'Out', abertos: 25, resolvidos: 24 },
  { name: 'Nov', abertos: 30, resolvidos: 28 },
  { name: 'Dez', abertos: 35, resolvidos: 30 },
];

const TicketTimeline = ({ tickets }: TicketTimelineProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">{`Abertos: ${payload[0].value}`}</p>
          <p className="text-sm text-green-600">{`Resolvidos: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Chamados ao Longo do Tempo</CardTitle>
          <CardDescription>
            Comparativo entre chamados abertos e resolvidos
          </CardDescription>
        </div>
        <Select defaultValue="year">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Este Mês</SelectItem>
            <SelectItem value="quarter">Trimestre</SelectItem>
            <SelectItem value="year">Este Ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="abertos" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolvidos" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4 mt-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border-l-2 border-primary pl-4">
              <div className="space-y-1">
                <p className="font-medium">{ticket.title}</p>
                <p className="text-sm text-gray-500">
                  Status: {ticket.status} | Prioridade: {ticket.priority}
                </p>
                <p className="text-sm text-gray-500">
                  Cliente: {ticket.client.name}
                </p>
                <p className="text-sm text-gray-500">
                  Data: {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketTimeline;
