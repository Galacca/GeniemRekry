import * as express from 'express';
import { userServiceGetSingle } from '../services/userService'
import {getAllUsers} from "../repositories/userRepository"

export default (router: express.Router) => {
    router.get('/users', async (req, res, next) => {
        try {
            res.send(await getAllUsers());
        }
        catch(err) {
            next(err); 
        }
    });
  
    router.get('/users/:id', async (req, res, next) => {
      const id = req.params.id;
      try {
        res.send(await userServiceGetSingle(id))
      }
      catch(err) {
        next(err);
      }
    });
  };
  