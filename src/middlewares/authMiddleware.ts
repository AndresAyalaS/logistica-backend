import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email?: string;
        role?: string;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  debugger
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "No token provided!" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};

export default authenticateToken;
