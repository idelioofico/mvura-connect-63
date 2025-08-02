import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload;
}; 