import { NotFoundError } from "../exeptions/not-found-error";
import { InputError } from "../exeptions/input-error";

export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res.status(404).send(err.message);
    } else if (err instanceof InputError) {
        res.status(400).send(err.message);
    }  else {
        res.status(500).send(err.message);
    }
}
