import { PrismaClient, UserRole, TicketStatus, TicketPriority } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuários
  const adminPassword = await hash('admin123', 10);
  const atendentePassword = await hash('atendente123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@mvura.co.mz',
      passwordHash: adminPassword,
      role: UserRole.admin,
    },
  });

  const atendente = await prisma.user.create({
    data: {
      name: 'Atendente',
      email: 'atendente@mvura.co.mz',
      passwordHash: atendentePassword,
      role: UserRole.atendente,
    },
  });

  // Criar clientes
  const clientes = await Promise.all([
    prisma.client.create({
      data: {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '841234567',
        address: 'Rua Principal, 123',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Maria Santos',
        email: 'maria@email.com',
        phone: '842345678',
        address: 'Avenida Central, 456',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Pedro Oliveira',
        email: 'pedro@email.com',
        phone: '843456789',
        address: 'Travessa das Flores, 789',
      },
    }),
  ]);

  // Criar tickets
  const tickets = await Promise.all([
    prisma.ticket.create({
      data: {
        title: 'Vazamento de água',
        description: 'Vazamento na rua principal',
        status: TicketStatus.open,
        priority: TicketPriority.high,
        clientId: clientes[0].id,
        assignedToId: atendente.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: 'Falta de água',
        description: 'Sem água há 2 dias',
        status: TicketStatus.in_progress,
        priority: TicketPriority.medium,
        clientId: clientes[1].id,
        assignedToId: atendente.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: 'Conta com valor incorreto',
        description: 'Valor da conta está muito alto',
        status: TicketStatus.open,
        priority: TicketPriority.low,
        clientId: clientes[2].id,
      },
    }),
  ]);

  // Criar comentários
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Vou enviar uma equipe para verificar o vazamento',
        ticketId: tickets[0].id,
        userId: atendente.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Equipe está a caminho',
        ticketId: tickets[1].id,
        userId: atendente.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Vou verificar a conta',
        ticketId: tickets[2].id,
        userId: admin.id,
      },
    }),
  ]);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 