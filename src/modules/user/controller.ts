import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Logging from 'library/logging';
import mongoose from 'mongoose';
import Author from './model';
import { StatusCodes } from 'http-status-codes';

const createAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name = '' } = { ...req.body };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ errors: errors.array() });
    }

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name,
    });

    Logging.info('Reached Controller');
    try {
        const author_1 = await author.save();
        return res.status(201).json({ author });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await Author.find();
        return res.status(200).json({ authors });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createAuthor, readAll };
