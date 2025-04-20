import { UserRepository } from '../repository/userRepository';
import { generateToken } from '../utils/jwtUtils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = 'tu_secreto_jwt';

export class AuthService {

    static async register(username: string, email: string, password: string) {

        // Verificar si el usuario ya existe
        const existingUser = await UserRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('El correo ya está registrado.');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = await UserRepository.createUser(username, email, hashedPassword);
        const token = generateToken(user.id, user.email, user.role);
        return { user, token };
    }

    static async login(email: string, password: string) {

        // Buscar al usuario por correoº
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('El correo no está registrado.');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta.');
        }

        const token = generateToken(user.id, user.email, user.role);
        return { user, token };
    }

    static async getUserByEmail(email: string) {
        return UserRepository.findUserByEmail(email);
    }
}