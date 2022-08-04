import Logging from 'utils/library/logging';
import Usermodel, { User } from './model';

class UserService {
    private userObject = Usermodel;

    public async getUser(name: string) {
        const user = await this.userObject.findOne({ name });
        return user;
    }

    public async create(data: User) {
        try {
            const post = await this.userObject.create({ ...data });
            Logging.info(post);
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        }
    }
}

export default UserService;
