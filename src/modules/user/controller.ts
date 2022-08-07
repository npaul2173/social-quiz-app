import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { Controller } from 'utils/interfaces/controller';
import Logging from 'utils/library/logging';
import { validate } from 'utils/library/validate';
import { User } from './model';
import UserService from './service';
import { validationSchema } from './validation';

class UserController implements Controller {
    // initializing  the data model
    public path: string = '/user';
    public router: Router = Router();
    private userService = new UserService();
    constructor() {
        this.initialiseRouters();
    }

    private initialiseRouters(): void {
        this.router.post(
            `${this.path}/create`,
            validationSchema,
            validate,
            this.create
        );
        this.router.post(
            `${this.path}/update`,
            // validationSchema,
            // validate,
            this.update
        );
    }

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id, data } = req.body as { id: string; data: User };
            Logging.info({ id, data });
            const ProductData = await this.userService.updateById(id, data);
            res.status(StatusCodes.CREATED).json({ data: ProductData });
        } catch (error) {
            next(
                new HttpException(StatusCodes.BAD_REQUEST, 'Cannot create post')
            );
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = req.body as User;
            Logging.info(data);
            const ProductData = await this.userService.create(data);
            res.status(StatusCodes.CREATED).json({ data: ProductData });
        } catch (error) {
            next(
                new HttpException(StatusCodes.BAD_REQUEST, 'Cannot create post')
            );
        }
    };
}

export default UserController;
