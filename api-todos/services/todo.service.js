import { pool } from '../db/mysql/db.js'
// const todos = []

// const getAllTodos = async () => {
//     return todos
// }

// export default getAllTodos


export class TodoService {

    // porque no necesitaria una instancia de la clase
    static async getAllTodos() {

        const [results] = await pool.query("SELECT *FROM todos")

        return results
    }

    static async getTodoById(id) {

        // return todos.find( todo => todo.id === id ) 
        const [results] = await pool.query(`SELECT *FROM todos where id = :id `, { id })

        return results
    }

    static async createTodo(todo) {

        // const { title, description, completed } = todo

        await pool.query(`insert into todos (id, title, description, completed) values 
                    ( UUID(), :title, :description , :completed ) `, { ...todo })

    }

}