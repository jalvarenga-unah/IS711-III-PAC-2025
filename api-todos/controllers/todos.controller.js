import { sendResponse } from '../helpers/send_response.js'
import { TodoService } from '../services/todo.service.js'

export const getAllTodos = async (req, res) => {

    // el uso del servicio para obtener los datos

    try {

        const todos = await TodoService.getAllTodos()

        sendResponse({ res, message: "Listado de tareas", data: todos })

    } catch (e) {

        sendResponse({ res, message: e.message, data: null, statusCode: 500 })

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

    // 2. guardar en la BBDD
    const data = await TodoService.createTodo(req.body)

    // 3. responder al cliente

    sendResponse({ res, message: "Tarea creada correctamente", data, statusCode: 201 })
}