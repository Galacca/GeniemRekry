import { Model } from 'objection';
import { tables } from '../../constants';
import TodoList from './TodoList'

export default class User extends Model {
  static tableName = tables.USER_TABLE;

  readonly id!: number;
  username: string;
  name?: string;
  passwordHash: string;
  
  static jsonSchema = {
    type: 'object',
    required: ['username'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      passwordHash: { type: 'string', minLength: 1, maxLength: 255 }
    },
  };

  static relationMappings = {
    todolists: {
      relation: Model.HasOneRelation,
      modelClass: TodoList,
      join: {
        from: 'users.id',
        to: 'todolist.ownerId'
      }
    }
  }

}
