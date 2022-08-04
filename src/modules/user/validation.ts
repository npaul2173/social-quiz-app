import { body, check } from 'express-validator';

const findValidation = [body('name').exists().withMessage('Name is required')];

// const findValidation = [check('name', 'Name is required')];

export { findValidation };
