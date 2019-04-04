import {repositoryCreateNewUser, repositoryLoginUser} from "../repositories/userRepository"
const bcrypt = require('bcryptjs')
const { crypto } = require('../../constants');
import {BadRequestError, UnauthorizedError} from "../Errors";
const jwt = require('jsonwebtoken')

export const createNewUser = async (request) => {
    const body = request.body
    
    if (body.password.length < 3) throw new BadRequestError('Password needs to be at least 3 characters long.');
    const passwordHash = await bcrypt.hash(body.password, crypto.SALT_ROUNDS)

    const user = {
        username: body.username,
        name: body.name,
        lastName: body.lastName,
        passwordHash
    }
      return await repositoryCreateNewUser(user);
}

export const loginUser = async (request, response) => {
    const body = request.body
    const user = await repositoryLoginUser(body.username)
    const passwordCorrect = user === undefined ?
    false :
    await bcrypt.compare(body.password, user.passwordHash)

  if ( !(user && passwordCorrect) ) {
    throw new UnauthorizedError('Invalid username or password')
  }

  const userForToken = {
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SIGNING_SECRET)

  response.status(200).send({ token, id: user.id})

}


