import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from 'utils/exception/http.exception';
import { Controller } from 'utils/interfaces/controller';
import { validate } from 'utils/library/validate';
import { Product } from './model';
import ProductService from './service';
import { validationSchema } from './validation';

class ProductController implements Controller {
    // initializing  the data model
    public path: string = '/product';
    public router: Router = Router();
    private ProductService = new ProductService();
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
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const data = req.body as Product;
            const ProductData = await this.ProductService.create(data);
            res.status(StatusCodes.CREATED).json({ data: ProductData });
        } catch (error) {
            next(
                new HttpException(StatusCodes.BAD_REQUEST, 'Cannot create post')
            );
        }
    };
}

export default ProductController;
