import { Router } from 'express';
import { setAuthRoutes } from './authRoutes';

const router = Router();

export const setRoutes = (app: any) => {
    setAuthRoutes(router);
    app.use('/api', router);
};