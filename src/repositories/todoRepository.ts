import Todo from '../models/Todo';
import User from '../models/User';
import TodoList from '../models/TodoList'

//TODO: Naming consistancy
    export const getAllTodos = async () => {
        return await Todo.query();
    }
    
    export const getSingleTodo = async (id: number) => {
        return await Todo.query().where({ id }).first()
    }
    
    //Could use a duplicate check. Maybe just patch the creation date and time if duplicate
    export const newTodo = async (todoId: number, userIdFromToken: number) => {
        const user = await User.query().findById(userIdFromToken);
        const todo = await Todo.query().findById(todoId).select('title')
        if(!todo) return null
        return await user.$relatedQuery('todolists').insertAndFetch(todo);
    }

    export const createAllTodos = async (userIdFromToken: number) => {
        //Bit of a lazy hack to just delete existing entries instead of checking for duplicates.
        //The todo's carry a creation date and time. This effectively refreshes the date and time which is probably wanted behaviour?
        await TodoList.query().delete().where('ownerId', '=', userIdFromToken)      
        const user = await User.query().findById(userIdFromToken);
        const todo = await Todo.query().select('title', 'id').orderBy('id')
        
        //No batch insert available so we have to get a bit creative
        let repeats = todo.length
         while (repeats > 0) {
            const todoToInsert = await Todo.query().findById(repeats).select('title')
            await user.$relatedQuery('todolists').insert(todoToInsert)
            repeats--
          }

        return await TodoList.query().where('ownerId', '=', userIdFromToken)
    }

    


   