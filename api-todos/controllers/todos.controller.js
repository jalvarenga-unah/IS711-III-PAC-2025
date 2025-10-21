import { TodoService } from '../services/todo.service.js'

export const getAllTodos = async (req, res) => {

    // el uso del servicio para obtener los datos
    const todos = await TodoService.getAllTodos()

    res.json({
        success: true,
        message: 'Listado de tareas',
        data: todos
    })
}

// export function getAllTodos(req, res) {
//     res.json({ "todos": [], "queries": req.query })
// }

export const getTodoById = async (req, res) => {

    const { id } = req.params
    // const id = req.params.id


    const todo = await TodoService.getTodoById(id)
    if (todo === -1) {
        return res.status(404).json({
            success: false,
            message: 'No existe esta tarea',
            data: null
        })
    }

    res.json({
        success: true,
        message: 'Listado de tareas',
        data: todo
    })
}

export const createTodo = (req, res) => {

    // 1. obtener los datos del body 
    // 1.2 validar los datos, para que cumplan con la lógica del negocio

    // 2. guardar en la BBDD

    // 3. responder al cliente

    res.status(201).json({
        success: true,
        data: req.body || null,
        foo: 'bar'
    })
}