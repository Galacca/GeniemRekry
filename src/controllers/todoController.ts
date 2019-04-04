import * as express from 'express';
import {todoServiceGetSingle, todoServiceNewTodo, todoServiceAllTodos} from '../services/todoService'
import {getAllTodos} from "../repositories/todoRepository"

const getTokenFrom = (request: express.Request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

export default (router: express.Router) => {
    router.get('/todos', async (req, res, next) => {
        try {
            res.send(await getAllTodos());
        }
        catch(err) {
            next(err); 
        }
    });
  
    router.get('/todos/:id', async (req, res, next) => {
      const id = req.params.id;
      try {
        res.send(await todoServiceGetSingle(id))
      }
      catch(err) {
        next(err);
      }
    });

    router.post('/todos', async (req, res, next) => {
      const todoId = req.body.todo
      try {
          res.send(await todoServiceNewTodo(todoId, getTokenFrom(req)));
      }
      catch(err) {
          next(err); 
      }
  });

    router.post('/todos/all', async (req, res, next) => {
      try {
        res.send(await todoServiceAllTodos(getTokenFrom(req)));
      }
      catch(err) {
        next(err); 
    }
  });
  };
  