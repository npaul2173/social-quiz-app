import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { Controller } from 'utils/interfaces/controller';
import Logging from 'utils/library/logging';
import { validate } from 'utils/library/validate';
import { User } from './model';
import UserService from './service';
import { findValidation } from './validation';

class UserController implements Controller {
    public path: string = '/user';
    public router: Router = Router();
    private userService = new UserService();
    constructor() {
        this.initialiseRouters();
    }

    private initialiseRouters(): void {
        this.router.post(`${this.path}/create`, this.create);
        this.router.post(
            `${this.path}/register`,
            findValidation,
            validate,
            this.register
        );
    }

    private register = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const { email } = req.body as { email: string };
        const data = await this.userService.getUser(email);
        resp.status(StatusCodes.OK).json(data === null ? [] : [data]);
    };

    // create controllers
    private create = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = req.body as User;
            const UserData = await this.userService.create(data);
            resp.status(StatusCodes.CREATED).json({ data: UserData });
        } catch (error) {
            const errorValue = new HttpException(
                StatusCodes.BAD_REQUEST,
                'Cannot Create user'
            );
            next(errorValue);
        }
    };
}
export default UserController;
