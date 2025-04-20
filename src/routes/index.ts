import { Router } from 'express';
import { setAuthRoutes } from './authRoutes';
import shipmentRoutes from "./shipmentRoutes";
import carrierRoutes from './carrierRoutes';
import routeRoutes from './routeRoutes';

export const setRoutes = (app: any) => {
    const router = Router();
    
    // Rutas públicas (auth)
    setAuthRoutes(router);
    app.use('/api', router);
    
    // Rutas protegidas (requieren token JWT)
    router.use('/shipments', shipmentRoutes);
    router.use("/carriers", carrierRoutes);
    router.use("/routes", routeRoutes);
};