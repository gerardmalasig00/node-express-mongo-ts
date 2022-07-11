import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        PORT: port({ default: 8000 }),
        MONGO_HOST: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_DBNAME: str(),
    });
}

export default validateEnv;
