import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase/config';

// Extend express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        role?: string;
      }
    }
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      
      const decodedToken = await auth.verifyIdToken(bearerToken);
      
      // Store user uid for next middlewares
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
      
      next();
    } else {
      res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};
