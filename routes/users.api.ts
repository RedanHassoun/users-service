import { AppRoute } from './../common/interfaces/app-route';
import { Router } from 'express';
import { injectable, inject  } from 'inversify';
import { UsersController } from '../controllers/users-controller';

@injectable ()
export class UsersApi implements AppRoute {
    private router: Router;

    constructor(@inject(UsersController) private usersController: UsersController) {
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {
        this.router = Router();

        /**
        * @swagger
        * /user:
        *   post:
        *     tags:
        *     - "User"
        *     summary: "Add a new user"
        *     description: ""
        *     consumes:
        *     - "application/json"
        *     produces:
        *     - "application/json"
        *     parameters:
        *     - in: "body"
        *       name: "body"
        *       description: "The user object that has to be put to the database"
        *       required: true
        *       schema:
        *            type: "object"
        *            required:
        *            - "name"
        *            - "email"
        *            - "password"
        *            properties:
        *                name:
        *                    type: "string"
        *                    format: "John"
        *                email:
        *                    type: "string"
        *                    example: "John@mail.com"
        *                password:
        *                    type: "string"
        *                    example: "12345"
        *     responses:
        *        "400":
        *            description: "Invalid input"
        *        "201":
        *            description: "User has been created"
         */
        this.router.post('/api/v1/user', this.usersController.createUser);

        /**
        * @swagger
        *  /users:
        *    get:
        *      tags:
        *      - "User"
        *      summary: "Returns all users"
        *      description: ""
        *      produces:
        *      - "application/json"
        *      responses:
        *        "200":
        *          description: "successful operation"
        *          schema:
        *            type: "object"
        *            properties:
        *                id:
        *                    type: "integer"
        *                    format: "int64"
        *                name:
        *                    type: "string"
        *                    example: "John"
        *                email:
        *                    type: "string"
        *                    example: "John@mail.com"
        *                password:
        *                    type: "string"
        *                    example: "112233"
         */
        this.router.get('/api/v1/users', this.usersController.getAll);

        /**
        * @swagger
        * /user:
        *  delete:
        *    tags:
        *    - "User"
        *    summary: "Deletes a user"
        *    description: ""
        *    produces:
        *    - "application/json"
        *    parameters:
        *    - name: "id"
        *      in: "path"
        *      description: "The id of the user to delete"
        *      required: true
        *      type: "integer"
        *      format: "int64"
        *    responses:
        *      "400":
        *        description: "Invalid ID supplied"
        *      "404":
        *        description: "User not found"
         */
        this.router.delete('/api/v1/user/:id', this.usersController.delete);
    }
}

