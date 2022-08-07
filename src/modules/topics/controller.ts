import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { Controller } from 'utils/interfaces/controller';
import Logging from 'utils/library/logging';
import { validate } from 'utils/library/validate';
import { validation } from './validation';
import TopicModel, { Topic } from './model';
class TopicsController implements Controller {
    // initializing  the data model
    public path: string = '/topic';
    public router: Router = Router();
    private userObject = TopicModel;

    constructor() {
        this.initializeRouters();
    }

    private initializeRouters(): void {
        const route = this.router;
        route.post(`${this.path}/create`, validation, validate, this.create);
        // route.post(`${this.path}/update`, validation, validate, this.update);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = req.body as Topic;
            Logging.info(data);
            const topicResponse = await this.userObject.create(data);
            res.status(StatusCodes.CREATED).json({ data: topicResponse });
        } catch (error) {
            next(
                new HttpException(StatusCodes.BAD_REQUEST, 'Cannot create post')
            );
        }
    };
}

export default TopicsController;
