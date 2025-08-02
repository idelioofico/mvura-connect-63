
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketWithRelations } from "@/types"

interface TicketsByCategoryProps {
  tickets: TicketWithRelations[]
}

export function TicketsByCategory({ tickets }: TicketsByCategoryProps) {
  const categories = tickets.reduce((acc, ticket) => {
    const category = ticket.priority
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="font-medium">{category}</span>
              <span className="text-gray-500">{count} tickets</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Add default export
export default TicketsByCategory;
