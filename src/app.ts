import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose
            .connect(`mongodb://${MONGO_PATH}`)
            .then(() => console.log('connected'))
            .catch((error) => console.log(error));
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
