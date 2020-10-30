import { globalErrorHandler } from './error-handler';

export const globalResponseHandler = (data, req, res, next) => {
    if (data instanceof Error) {
        globalErrorHandler(data, req, res, next);
    } else {
        res.status(data.status).json(data);
    }
}
