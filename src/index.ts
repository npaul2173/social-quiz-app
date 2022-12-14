import 'dotenv/config';
import 'module-alias/register';
import ProductController from 'modules/product/controller';
import TopicsController from 'modules/topics/controller';
import UserController from 'modules/user/controller';
import App from './app';

const app = new App(Number(process.env.PORT), [
    new ProductController(),
    new UserController(),
    new TopicsController(),
]);

app.listen();
