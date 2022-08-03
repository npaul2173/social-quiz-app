import mongoose, { Document, Schema } from 'mongoose';

const SCHEMA_NAME = 'Author';
export interface Author {
    name: string;
}

export interface AuthorModel extends Author, Document {}

const AuthorSchema: Schema = new Schema(
    { name: { type: String, required: true } },
    { versionKey: false }
);

export default mongoose.model<AuthorModel>(SCHEMA_NAME, AuthorSchema);
