import * as express from 'express';
import { createNewUser, loginUser } from '../services/loginService'

export default (router: express.Router) => {
    router.post('/login/create', async (req, res, next) => {
        try {
            res.send(await createNewUser(req));
        }
        catch(err) {
            next(err); 
        }
    });
  
    router.post('/login', async (req, res, next) => {
      try {
        res.send(await loginUser(req, res))
      }
      catch(err) {
        next(err);
      }
    });
  };
  