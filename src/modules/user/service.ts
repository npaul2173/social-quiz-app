import UserModel, { User } from './model';

class UserService {
    private userObject = UserModel;

    public async updateById(id: string, data: User) {
        try {
            const post = await this.userObject.findByIdAndUpdate(id, data);
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        }
    }

    public async create(data: User) {
        try {
            const post = await this.userObject.create({ ...data });
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        }
    }
}

export default UserService;
