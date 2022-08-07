import { body, check } from 'express-validator';

const validation = [body('topicName').exists()];

export { validation };
