# users-service

This is a service for managing users that is written in Node.JS.
It is built following the “controller service repository” pattern, the APIs are documented using OpenApi (Swagger), and the server is also Dockerized and can be executed easily.

* **For managing and handling HTTP requests I used:** express
* **For dependency injection I used:**  inversify
* **For validation I used:** joi
* **As an ORM I used:**  sequelize
* **And for testing I used:** mocha, chai and ts-mockito
* **And the Database is:**  Postgres (as a Docker container)


## How to use:

1.	Make sure Docker is installed on your machine
2.	Clone the repository
3.	Open a CLI command line, and go to that directory (You should see the file ‘docker-compose.yml’ on the root folder)
4.	Run docker-compose up

## How to see the documentation:

1.	Make sure the server is running
2.	Browse to http://localhost: 3000/api-docs

## How to run tests:

1.	Open a CLI command line, go to the project root directory
2.	Run “npm install”  (If you haven’t done it yet)
3.	Run “npm run test”

## How to see the tests coverage:

1.	Open a CLI command line, go to the project root directory
2.	Run “npm install”  (If you haven’t done it yet)
3.	Run “npm run coverage”
