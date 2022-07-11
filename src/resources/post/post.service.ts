import PostModel from './post.model';
import Post from './post.interface';
import { ObjectId, Types } from 'mongoose';

class PostService {
    private post = PostModel;

    /**
     * Get posts
     */
    public async get(): Promise<Post[]> {
        try {
            const post = await this.post.find();
            return post;
        } catch (error) {
            throw new Error('Unable to retrieve posts');
        }
    }

    /**
     * Create a new post
     */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    /**
     * Retriev post
     */
    public async getById(id: string): Promise<Post | null> {
        try {
            const query = { _id: new Types.ObjectId(id) };
            const post = await this.post.findOne(query);
            return post;
        } catch (error: any) {
            throw new Error('Not a valid id');
        }
    }

    /**
     * Update post
     */
    public async update(id: string, body: object): Promise<Post | null> {
        try {
            const query = { _id: new Types.ObjectId(id) };
            const post = await this.post.findByIdAndUpdate(query, body);
            return post;
        } catch (error: any) {
            throw new Error('Not a valid id');
        }
    }
}
export default PostService;
