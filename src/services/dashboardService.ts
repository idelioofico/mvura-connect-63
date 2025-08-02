import pool from '../lib/db';

export class DashboardService {
  async getStats() {
    const [
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      totalClients,
      ticketsByPriority,
      ticketsByCategory,
      recentTickets
    ] = await Promise.all([
      this.getTotalTickets(),
      this.getOpenTickets(),
      this.getInProgressTickets(),
      this.getResolvedTickets(),
      this.getTotalClients(),
      this.getTicketsByPriority(),
      this.getTicketsByCategory(),
      this.getRecentTickets()
    ]);

    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      totalClients,
      ticketsByPriority,
      ticketsByCategory,
      recentTickets
    };
  }

  private async getTotalTickets(): Promise<number> {
    const { rows } = await pool.query('SELECT COUNT(*) FROM tickets');
    return parseInt(rows[0].count);
  }

  private async getOpenTickets(): Promise<number> {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE status = $1',
      ['open']
    );
    return parseInt(rows[0].count);
  }

  private async getInProgressTickets(): Promise<number> {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE status = $1',
      ['in_progress']
    );
    return parseInt(rows[0].count);
  }

  private async getResolvedTickets(): Promise<number> {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE status = $1',
      ['resolved']
    );
    return parseInt(rows[0].count);
  }

  private async getTotalClients(): Promise<number> {
    const { rows } = await pool.query('SELECT COUNT(*) FROM clients');
    return parseInt(rows[0].count);
  }

  private async getTicketsByPriority(): Promise<{
    low: number;
    medium: number;
    high: number;
  }> {
    const { rows } = await pool.query(`
      SELECT priority, COUNT(*) as count
      FROM tickets
      GROUP BY priority
    `);

    return {
      low: parseInt(rows.find(r => r.priority === 'low')?.count || '0'),
      medium: parseInt(rows.find(r => r.priority === 'medium')?.count || '0'),
      high: parseInt(rows.find(r => r.priority === 'high')?.count || '0')
    };
  }

  private async getTicketsByCategory(): Promise<Record<string, number>> {
    const { rows } = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM tickets
      GROUP BY category
    `);

    return rows.reduce((acc, row) => ({
      ...acc,
      [row.category]: parseInt(row.count)
    }), {});
  }

  private async getRecentTickets(): Promise<Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    clientName: string;
    createdAt: string;
  }>> {
    const { rows } = await pool.query(`
      SELECT 
        t.id,
        t.title,
        t.status,
        t.priority,
        t.created_at,
        c.name as client_name
      FROM tickets t
      JOIN clients c ON t.client_id = c.id
      ORDER BY t.created_at DESC
      LIMIT 5
    `);

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
      clientName: row.client_name,
      createdAt: row.created_at
    }));
  }
} 