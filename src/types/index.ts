export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}