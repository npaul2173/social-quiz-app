import ProductModel, { Product } from './model';

class ProductService {
    private product = ProductModel;

    public async create(data: Product) {
        try {
            const post = await this.product.create({ ...data });
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        }
    }
}

export default ProductService;
