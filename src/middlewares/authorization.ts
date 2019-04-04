import { UnauthorizedError} from '../Errors';
const jwt = require('jsonwebtoken')

//Simple authorization middleware. Goes through all requests looking for a valid token.
export const authorization = ((req, res, next) => {
    //Users do however need to be able to login and create new accounts without a token. Disable checks for those endpoints.
    if ( req.path == '/login/') return next();
    if ( req.path == '/login/create/') return next();
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    
    try{
    jwt.verify(req.token, process.env.JWT_SIGNING_SECRET) 
    next()
    }
    catch{
        throw new UnauthorizedError('Token missing or invalid.')
    }
})   