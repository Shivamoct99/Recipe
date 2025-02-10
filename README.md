# Live URL
This app is deployed and accessible at: [https://recipe-jgfu.onrender.com](https://recipe-jgfu.onrender.com)


## Description
This is a backend application built using NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. The application follows a modular architecture and uses TypeScript for type safety and maintainability.


## Features
User Authentication: Implements JWT-based authentication for secure login and signup.

#### Recipe Management:

     Fetch all recipes when no query parameters are provided.

     Filter recipes by label, chef name, or publication date range using query parameters.

     Only logged-in users can create new recipes.

#### Modular Architecture: The application is divided into feature-based modules for better scalability.

#### Dependency Injection: Uses NestJS's built-in DI system for managing services efficiently.

#### Validation & Error Handling: Uses class-validator and exception filters for request validation and structured error responses.


## Project setup

```bash
$ npm install
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


## API Routes

## API Endpoints

### Authentication

Signup: POST /user/signup

Login: POST /user/login (Returns a JWT token)

### Recipes

Fetch all recipes: GET /recipes (Returns all recipes if no query parameters are provided)

Filter recipes: GET /recipes?label=<label>&chef=<chef_name>&startDate=<start_date>&endDate=<end_date> (Filters recipes by label, chef name, or publication date range)

Create a new recipe: POST /recipes (Only for logged-in chef, requires JWT authentication)



