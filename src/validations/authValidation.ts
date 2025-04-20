import { z } from 'zod';

// Validación para el registro de usuarios
export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(5, 'La contraseña debe tener al menos 5 caracteres'),
});

// Validación para el login de usuarios
export const loginSchema = z.object({
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(5, 'La contraseña es requerida'),
});
