import { body, check } from 'express-validator';

const validationSchema = [
    body('firstName').exists(),
    body('lastName').exists(),
];

export { validationSchema };
