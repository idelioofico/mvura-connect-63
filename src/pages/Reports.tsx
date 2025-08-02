import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReportData } from '@/types';

const COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];

// Monthly data for tickets
const monthlyData = [
  { name: 'Jan', abertos: 65, resolvidos: 55, satisfacao: 4.2 },
  { name: 'Fev', abertos: 59, resolvidos: 49, satisfacao: 4.0 },
  { name: 'Mar', abertos: 80, resolvidos: 73, satisfacao: 4.1 },
  { name: 'Abr', abertos: 81, resolvidos: 75, satisfacao: 4.4 },
  { name: 'Mai', abertos: 56, resolvidos: 48, satisfacao: 4.3 },
  { name: 'Jun', abertos: 55, resolvidos: 50, satisfacao: 4.2 },
  { name: 'Jul', abertos: 40, resolvidos: 37, satisfacao: 4.5 },
  { name: 'Ago', abertos: 45, resolvidos: 42, satisfacao: 4.4 },
  { name: 'Set', abertos: 60, resolvidos: 55, satisfacao: 4.2 },
  { name: 'Out', abertos: 70, resolvidos: 63, satisfacao: 4.1 },
  { name: 'Nov', abertos: 67, resolvidos: 58, satisfacao: 4.3 },
  { name: 'Dez', abertos: 68, resolvidos: 62, satisfacao: 4.2 },
];

// Category data for tickets
const categoryData = [
  { name: 'Falta de Água', value: 35 },
  { name: 'Problemas no Contador', value: 25 },
  { name: 'Qualidade da Água', value: 20 },
  { name: 'Vazamento Visível', value: 15 },
  { name: 'Baixa Pressão', value: 5 },
];

// Resolution time data
const resolutionTimeData = [
  { name: 'Jan', tempo: 24 },
  { name: 'Fev', tempo: 22 },
  { name: 'Mar', tempo: 20 },
  { name: 'Abr', tempo: 18 },
  { name: 'Mai', tempo: 19 },
  { name: 'Jun', tempo: 17 },
  { name: 'Jul', tempo: 16 },
  { name: 'Ago', tempo: 18 },
  { name: 'Set', tempo: 20 },
  { name: 'Out', tempo: 22 },
  { name: 'Nov', tempo: 21 },
  { name: 'Dez', tempo: 20 },
];

// Attendant performance data
const attendantData = [
  { name: 'Maria O.', chamados: 42, resolvidos: 38, avaliacao: 4.5 },
  { name: 'Carlos S.', chamados: 38, resolvidos: 35, avaliacao: 4.7 },
  { name: 'Pedro L.', chamados: 34, resolvidos: 30, avaliacao: 4.2 },
  { name: 'Luísa F.', chamados: 30, resolvidos: 28, avaliacao: 4.6 },
  { name: 'Rafael M.', chamados: 28, resolvidos: 25, avaliacao: 4.3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} ${entry.name === 'satisfacao' || entry.name === 'avaliacao' ? '/5' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Reports = () => {
  const [dateRange, setDateRange] = useState('year');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const generateReport = async () => {
    try {
      const response = await fetch(`/api/reports?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <Layout title="Relatórios" description="Visualize estatísticas e indicadores de desempenho do sistema.">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <CalendarDays className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="semester">Último Semestre</SelectItem>
              <SelectItem value="year">Último Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatórios
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="tickets">Chamados</TabsTrigger>
            <TabsTrigger value="performance">Desempenho</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden transition-all hover:shadow-md animate-slide-up">
                <CardHeader>
                  <CardTitle>Chamados por Mês</CardTitle>
                  <CardDescription>
                    Comparativo entre chamados abertos e resolvidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
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
                        <Legend />
                        <Bar name="Abertos" dataKey="abertos" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                        <Bar name="Resolvidos" dataKey="resolvidos" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-all hover:shadow-md animate-slide-up animate-delay-100">
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>
                    Tipos de problemas reportados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden transition-all hover:shadow-md animate-slide-up animate-delay-200">
              <CardHeader>
                <CardTitle>Tempo Médio de Resolução (horas)</CardTitle>
                <CardDescription>
                  Evolução do tempo necessário para resolver chamados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={resolutionTimeData}
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
                      <Legend />
                      <Line
                        name="Tempo médio (horas)"
                        type="monotone"
                        dataKey="tempo"
                        stroke="#0ea5e9"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Gerar Relatório</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Inicial</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Final</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={generateReport} className="mt-4">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            {reportData && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Resultados do Relatório</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Período</h3>
                      <p>
                        {new Date(reportData.startDate).toLocaleDateString()} -{' '}
                        {new Date(reportData.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Total de Tickets</h3>
                      <p>{reportData.totalTickets}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Tickets por Status</h3>
                      <ul className="list-disc pl-5">
                        {Object.entries(reportData.ticketsByStatus).map(([status, count]) => (
                          <li key={status}>
                            {status}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Tickets por Prioridade</h3>
                      <ul className="list-disc pl-5">
                        {Object.entries(reportData.ticketsByPriority).map(([priority, count]) => (
                          <li key={priority}>
                            {priority}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold">Tempo Médio de Resolução</h3>
                      <p>{reportData.averageResolutionTime} horas</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Tickets por Atendente</h3>
                      <ul className="list-disc pl-5">
                        {Object.entries(reportData.ticketsByAttendant).map(([attendant, count]) => (
                          <li key={attendant}>
                            {attendant}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Desempenho dos Atendentes</CardTitle>
                <CardDescription>
                  Comparativo de desempenho entre atendentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendantData}
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
                      <Legend />
                      <Bar name="Chamados Atribuídos" dataKey="chamados" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                      <Bar name="Chamados Resolvidos" dataKey="resolvidos" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Índice de Satisfação</CardTitle>
                <CardDescription>
                  Avaliação dos clientes sobre atendimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        name="Satisfação (1-5)"
                        type="monotone"
                        dataKey="satisfacao"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
