import {getSingleUser} from "../repositories/userRepository"
import {NotFoundError} from "../Errors";

//This is a bit redundant, but I assume it needs to be included since it is in the task repo
export const userServiceGetSingle = async (id: number) => {
      const user = await getSingleUser(id)
      if (!user) throw new NotFoundError('No such user!');
      return user;
}