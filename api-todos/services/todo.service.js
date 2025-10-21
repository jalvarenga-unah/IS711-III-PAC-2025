import todos from '../db/local/todos.json' with { type: 'json' }
// const todos = []

// const getAllTodos = async () => {
//     return todos
// }

// export default getAllTodos


export class TodoService {

    // porque no necesitaria una instancia de la clase
    static async getAllTodos() {
        return todos
    }

    static async getTodoById(id) {

        // return todos.find( todo => todo.id === id ) 
        return todos.find((todo) => {
            return todo.id === id
        })

    }

}