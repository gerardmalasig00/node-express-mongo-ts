import 'dotenv/config';
import 'module-alias/register.js';
import App from './app';
import validateEnv from '@/utils/validateEnv';

// Controllers
import PostController from '@/resources/post/post.controller';

validateEnv();
const app = new App([new PostController()], Number(process.env.PORT));
app.listen();
