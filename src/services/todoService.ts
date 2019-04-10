import {getSingleTodo, createAllTodos, newTodo} from "../repositories/todoRepository"
import {NotFoundError, UnauthorizedError} from "../Errors";

const jwt = require('jsonwebtoken')

//Dont really need much checking since the authorization middleware doesnt allow any actions without a token and
//all user id's are fetched from said token
//This should prevent users being able to edit other users data

//This function is a bit redundant, but I assume it needs to be included since it is in the task repo
export const todoServiceGetSingle = async (id: number) => {
      const todo = await getSingleTodo(id)
      if (!todo) throw new NotFoundError('No such todo!');
      return todo;
}

export const todoServiceNewTodo = async (todoId: number, token: any) => {
      const decodedToken = await jwt.verify(token, process.env.JWT_SIGNING_SECRET)

      if (!token || !decodedToken.id) {
            throw new UnauthorizedError('Token missing or invalid.')
      }

      const todo = await newTodo(todoId, decodedToken.id)
      if (!todo) throw new NotFoundError('No such todo!');
      return todo
}

export const todoServiceAllTodos = async (token: any) => {
      const decodedToken = await jwt.verify(token, process.env.JWT_SIGNING_SECRET)

      if (!token || !decodedToken.id) {
            throw new UnauthorizedError('Token missing or invalid.')
      }

      const todo = await createAllTodos(decodedToken.id)
      return todo
}





