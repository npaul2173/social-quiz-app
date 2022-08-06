import mongoose, { Document, Schema } from 'mongoose';
interface User {
    name: string;
    email: string;
    subtitle: string;
    interests: string[];
    company: string;
    profilePhoto: string;
}

type UserSchema = User & Document;

const schema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subtitle: { type: String },
    interests: { type: [String] },
    company: String,
    profilePhoto: String,
});

export default mongoose.model<UserSchema>('User', schema);
export { UserSchema, User };
