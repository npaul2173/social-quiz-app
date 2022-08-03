import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validationSchema = [
    body('name').isEmail().withMessage('Not a valid email format'),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors,
    });
};

export { validationSchema, validate };
