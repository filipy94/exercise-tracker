# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) :symbols:

his project is part of the FreeCodeCamp's Back End Development and APIs Certification.

Packages used:

- [Express](https://expressjs.com/)
- [Moment.js](https://momentjs.com/)
- [body-parser](https://github.com/expressjs/body-parser#readme)
- [MongoDB](https://mongoosejs.com/)

## Functionality :heavy_check_mark:

- You can POST to `/api/users` with form data username to create a new user.

- The returned response from POST `/api/users` with form data username will be an object with `username` and `_id` properties.

- You can make a GET request to `/api/users` to get a list of all users.

- The GET request to `/api/users` returns an array.

- Each element in the array returned from GET `/api/users` is an object literal containing a user's `username` and `_id`.

- You can POST to `/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used.

- The response returned from POST `/api/users/:_id/exercises` will be the user object with the exercise fields added.

- You can make a GET request to `/api/users/:_id/logs` to retrieve a full exercise log of any user.

- A request to a user's log GET `/api/users/:_id/logs` returns a user object with a `count` property representing the number of exercises that belong to that user.

- A GET request to `/api/users/:id/logs` will return the user object with a `log` array of all the exercises added.

- Each item in the `log` array that is returned from GET `/api/users/:id/logs` is an object that should have a `description`, `duration`, and `date` properties.

- The `description` property of any object in the `log` array that is returned from GET `/api/users/:id/logs` should be a string.

- The `duration` property of any object in the `log` array that is returned from GET `/api/users/:id/logs` should be a number.

- The `date` property of any object in the `log` array that is returned from GET `/api/users/:id/logs` should be a string.. Use the dateString format of the Date API.

- You can add from, to and limit parameters to a GET `/api/users/:_id/logs` request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

## How To Run FCC Tests locally

- Has [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) (and optionally [Yarn](https://yarnpkg.com/)) installed and updated on your machine;

- Clone (`$ git clone git@github.com:filipy94/exercise-tracker.git`) or donwload this repository;

- Navigate to project root;

- Install the dependencies with `$ npm install` or `$ yarn install`;

- Execute the project with `$ npm start` or `$ yarn start`;

- Manually open the browser and go to `http://localhost:PORT`.