import User from '../models/User';

//None of these should return the password hashes.
//TODO: Naming consistancy

    export const getAllUsers = async () => {
        return await User.query()
    }
    
    export const getSingleUser = async (id: number) => {
        return await User.query().where({ id }).first()
    }

    export const repositoryCreateNewUser = async (user: object) => {
        return await User.query().insert(user)
    }

    //Except this one...
    export const repositoryLoginUser = async (bodyUsername) => {
        return await User.query().where('username', '=', bodyUsername ).first()
    }
    