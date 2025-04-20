import { Router } from 'express';
import { setAuthRoutes } from './authRoutes';
import shipmentRoutes from "./shipmentRoutes";

export const setRoutes = (app: any) => {
    const router = Router();
    
    // Rutas públicas (auth)
    setAuthRoutes(router);
    app.use('/api', router);
    
    // Rutas protegidas (requieren token JWT)
    router.use('/shipments', shipmentRoutes);
};