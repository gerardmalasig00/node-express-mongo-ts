import express, { Application, Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_HOST, MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME } =
            process.env;

        mongoose.connect(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}`
        );
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${process.env.HOST}`);
        });
    }
}

export default App;
