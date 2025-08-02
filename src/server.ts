import express from 'express';
import cors from 'cors';
import { authMiddleware, adminMiddleware } from './middleware/auth';
import { UserService } from './services/userService';
import { TicketService } from './services/ticketService';
import { ClientService } from './services/clientService';
import { CommentService } from './services/commentService';
import { DashboardService } from './services/dashboardService';

const app = express();
const userService = new UserService();
const ticketService = new TicketService();
const clientService = new ClientService();
const commentService = new CommentService();
const dashboardService = new DashboardService();

app.use(cors());
app.use(express.json());

// Rotas públicas
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.login(email, password);
    res.json(response);
  } catch (error) {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Rotas protegidas
app.use(authMiddleware);

// Dashboard
app.get('/dashboard', async (req, res) => {
  try {
    const stats = await dashboardService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar estatísticas' });
  }
});

// Tickets
app.get('/tickets', async (req, res) => {
  try {
    const tickets = await ticketService.getTickets(req.query);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar tickets' });
  }
});

app.post('/tickets', async (req, res) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ticket' });
  }
});

app.get('/tickets/:id', async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar ticket' });
  }
});

// Comentários
app.get('/tickets/:id/comments', async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar comentários' });
  }
});

app.post('/tickets/:id/comments', async (req, res) => {
  try {
    const comment = await commentService.addComment(
      req.params.id,
      req.user!.id,
      req.body.content
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar comentário' });
  }
});

// Clientes
app.get('/clients', async (req, res) => {
  try {
    const clients = await clientService.getClients(req.query.search as string);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar clientes' });
  }
});

app.post('/clients', async (req, res) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente' });
  }
});

// Rotas administrativas
app.use(adminMiddleware);

app.get('/users', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar usuários' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 