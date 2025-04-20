import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback';

export function generateToken(id: number, email?: string, role?: string): string {
    const payload: any = { id };
    if (email) payload.email = email;
    if (role) payload.role = role;
  
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};