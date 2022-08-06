import { body, check } from 'express-validator';

const findValidation = [
    body('name', 'Name field required').exists(),
    body('email').isEmail().normalizeEmail().withMessage('almsdlak'),
    body('company', 'Company field required').exists(),
];

// const findValidation = [check('name', 'Name is required')];

export { findValidation };
