import express from 'express';
import controller from './controller';
import { validate, validationSchema } from './validations';
const router = express.Router();

router.post('/create', validationSchema, validate, controller.createAuthor);
router.get('/list', controller.readAll);

export default router;
