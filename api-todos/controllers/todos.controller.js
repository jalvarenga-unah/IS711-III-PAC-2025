
import { sendResponse } from '../helpers/send_response.js'
import { validatetodo } from '../schemas/todo.schema.js'
import { TodoService } from '../services/todo.service.js'

export const getAllTodos = async (req, res, next) => {

    // el uso del servicio para obtener los datos
    try {

        const todos = await TodoService.getAllTodos()

        sendResponse({ res, message: "Listado de tareas", data: todos })

    } catch (e) {

        next(e)
        // sendResponse({ res, message: e.message, data: null, statusCode: 500 })

        // res.status(500).json({
        //     success: false,
        //     message: e,
        //     data: null
        // })

    }
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

export const createTodo = async (req, res) => {

    // 1. obtener los datos del body 
    // 1.2 validar los datos, para que cumplan con la lógica del negocio

    // const { title, description, completed } = req.body
    // if (typeof title !== 'string') {
    //     return sendResponse({ res, message: "el titulo debe ser un sttring", statusCode: 400 })
    // }

    // if (title.length < 5) {
    //     return sendResponse({ res, message: "el titulo debe tener al menos 5 caracteres", statusCode: 400 })
    // }

    const { success, error, data: safeData } = validatetodo(req.body)

    if (!success) {
        return sendResponse({ res, message: "que algo salió mal", data: error.issues, statusCode: 400 })
    }

    // 2. guardar en la BBDD
    const data = await TodoService.createTodo(safeData)

    // 3. responder al cliente

    sendResponse({ res, message: "Tarea creada correctamente", data, statusCode: 201 })
}