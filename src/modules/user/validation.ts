import { body, check } from 'express-validator';

const validation = [
    body('name', 'Name field required').exists(),
    body('email').isEmail().normalizeEmail().withMessage('almsdlak'),
    body('company', 'Company field required').exists(),
];

export { validation };
