import 'dotenv/config';
import 'module-alias/register';
import ProductController from 'modules/product/controller';
import App from './app';
const app = new App(Number(process.env.PORT), [new ProductController()]);

app.listen();
