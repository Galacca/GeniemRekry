require('dotenv').config();

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as Knex from 'knex';
import * as morgan from 'morgan';
import registerTodoApi from './controllers/todoController';
import registerUserApi from './controllers/userController';
import registerLoginApi from './controllers/loginController';
import { authorization} from './middlewares/authorization'
import { Model } from 'objection';
import { errorHandler } from './middlewares/errorHandler';

// Initialize knex the SQL query builder.
const knexConfig = require('../knexfile');
export const knex = Knex(knexConfig.development);

// Create or migrate the database:
knex.migrate.latest();

// Bind the knex instance to the base Model class
Model.knex(knex);

// Unfortunately the express-promise-router types are borked. Just require():
const router = require('express-promise-router')();
const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(authorization)
  .use(router)
  .use(errorHandler)
  .set('json spaces', 2);

// Register our REST API.
registerTodoApi(router)
registerUserApi(router)
registerLoginApi(router)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Todo app listening at port %s', port);
});
