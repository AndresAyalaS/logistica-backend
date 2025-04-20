import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { registerSchema, loginSchema } from '../validations/authValidation';


class AuthController {
    // Registro de usuario
    static async register(req: Request, res: Response) {
        try {
            const data = registerSchema.parse(req.body);
            const { username, email, password } = req.body;
            const newUser = await AuthService.register(username, email, password);
            return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    // Inicio de sesión
    static async login(req: Request, res: Response) {
        try {
            const data = loginSchema.parse(req.body);
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);

            return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;