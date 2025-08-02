import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.user = decoded;
  next();
}

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  next();
} 