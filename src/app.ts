import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Logging from 'utils/library/logging';
import UserRoutes from 'modules/author/routes';
import { Controller } from 'utils/interfaces/controller';
class App {
    public express: Application;
    public port: number;

    constructor(port: number, controllers: Controller[]) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initializeSwagger();
    }

    private initializeSwagger(): void {}
    private initialiseMiddleware(): void {
        this.express.use(helmet()); // Security Layer
        this.express.use(cors()); // cors
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
        this.express.use('/user', UserRoutes);
        this.express.get('/', (req, res, next) =>
            res.status(200).json({ message: 'base Url' })
        );
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose
            .connect(`mongodb://${MONGO_PATH}`)
            .then(() => Logging.info('Database  Connected 🔗'))
            .catch((error) => console.log(error));
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            Logging.info(`App listening on the port ${this.port} 🤞`);
        });
    }
}

export default App;
