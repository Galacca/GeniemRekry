import { Model } from 'objection';
import { tables } from '../../constants';

export default class TodoList extends Model {
  static tableName = tables.TODO_LIST_TABLE;

  readonly id!: number;
  ownerId!: number;
  title: string;
  
  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'integer' },
      ownerId: { type: ['integer', 'null'] },
      title: { type: 'string', minLength: 1, maxLength: 255 },
    },
  };

  static relationMappings = {
    owner: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'todolist.ownerId',
        to: 'users.id'
      }
    }
  }
}
