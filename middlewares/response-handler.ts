import { globalErrorHandler } from './error-handler';

export const globalResponseHandler = (data, req, res, next) => {
    if (data instanceof Error) {
        globalErrorHandler(data, req, res, next);
    } else {
        const statusCode = res.statusCode ? Number(res.statusCode) : 200;
        res.status(statusCode).json(data);
    }
}
