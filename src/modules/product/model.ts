import mongoose, { Schema , Document} from 'mongoose';

const SCHEMA_NAME = 'Product';
interface Product {
    name: string;
    price: number;
    description: string;
}

type ProductSchema = Product & Document;

const schema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<ProductSchema>(SCHEMA_NAME, schema);

export { Product, ProductSchema };
