import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (userId: number): string => {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
};

export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
};