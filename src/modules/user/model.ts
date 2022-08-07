import mongoose, { Schema, Document } from 'mongoose';

const SCHEMA_NAME = 'User';
interface User {
    firstName: string;
    middleName: string;
    lastName: string;
    subtitle: string;
    interests: string[];
    bio: string;
    company: {
        name: string;
        workExperience: number;
    };
}

type ProductSchema = User & Document;

const schema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    subtitle: { type: String },
    bio: { type: String, trim: true },
    interests: [String],
    company: {
        name: { type: String, required: true },
        workExperience: { type: Number, default: 4.5 },
    },
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model<ProductSchema>(SCHEMA_NAME, schema);

export { User, ProductSchema };
