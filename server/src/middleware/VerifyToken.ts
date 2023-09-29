import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

// Extend the Request object to include a decodedToken property
declare global {
  namespace Express {
    interface Request {
      decodedToken?: any; 
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    console.log('Token received:', token);

    console.log(token,"hey token")
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const decodedToken = jwt.verify(token, secretKey) as any;
    console.log('Token is valid:', decodedToken);

    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed',  (error as Error).message);
    return res.status(401).json({ message: 'Token verification failed' });
  
};

}
export default verifyToken;
