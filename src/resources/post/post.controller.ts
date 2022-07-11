import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';

import validate from './post.validation';
import PostService from './post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}`, this.get);
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            this.update
        );

        this.router.delete(`${this.path}/:id`, this.update);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const posts = await this.PostService.get();
            res.status(200).json(posts);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const posts = await this.PostService.getById(id);
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).send({
                    status: 400,
                    message: 'Post not found',
                });
            }
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const body = req.body;
            const posts = await this.PostService.update(id, body);
            res.status(200).json(posts);
        } catch (error: any) {
            console.log(new HttpException(400, error.message));
            next(new HttpException(400, error.message));
        }
    };
}

export default PostController;
