import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validationSchema = [
    body('name').isEmail().withMessage('Not a valid email format'),
];

export { validationSchema };
