import { body } from 'express-validator';

const validationSchema = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Minimum two characters required'),
    body('description').exists().withMessage('Description is required'),
    body('price')
        .exists()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Not Numeric'),
];

export { validationSchema };
