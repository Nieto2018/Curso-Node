// import importacion_por_defecto, { importaciones_alternativas } from 'express';
import express, { Application } from 'express';
import cors from 'cors';

// Es más interesante cuando tiene más de una importaciones
// import * as userRoutes from '../routes/usuarios';

// Definimos un alias para la importación por defecto
import userRoutes from '../routes/usuarios';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // TODO: Conectar base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    routes() {

        // .default es si tiene más de una importaciones
        // this.app.use(this.apiPaths.usuarios, userRoutes.default)

        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }

}

export default Server;