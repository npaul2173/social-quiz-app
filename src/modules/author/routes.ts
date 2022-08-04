import express from 'express';
import { validate } from 'utils/library/validate';
import controller from './controller';
import { validationSchema } from './validations';
const router = express.Router();

router.post('/create', validationSchema, validate, controller.createAuthor);
router.get('/list', controller.readAll);

export default router;
