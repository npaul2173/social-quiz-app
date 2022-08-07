import mongoose, { Schema, Document } from 'mongoose';

const SCHEMA_NAME = 'Topic';
interface Topic {
    topicName: string;
    createdAt: string;
}

type TopicSchema = Topic & Document;

const schema: Schema = new Schema({
    topicName: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model<TopicSchema>(SCHEMA_NAME, schema);

export { Topic, TopicSchema };
