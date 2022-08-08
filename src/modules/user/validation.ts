import { body, check } from 'express-validator';

const validation = [
    body('firstName', 'First name required').exists(),
    body('lastName', 'Last name required').exists(),
    body('topics').isArray({ min: 1 }),
    body('email', 'Enter valid email').isEmail().normalizeEmail(),
];

export { validation };
