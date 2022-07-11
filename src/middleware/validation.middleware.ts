import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );

            req.body = value;
            next();
        } catch (e: any) {
            if (e) {
                const errors: object[] = [];
                e.details.forEach((error: Joi.ValidationErrorItem) => {
                    errors.push({
                        field: error?.context?.label,
                        message: error?.message.replace(/[\\"]/g, ''),
                    });
                });
                res.status(400).send({ type: 'Validation', errors: errors });
            }

            res.status(500).send('Something went wrong');
        }
    };
}

export default validationMiddleware;
