
import { Router } from 'express'
import { createTodo, getAllTodos, getTodoById } from '../controllers/todos.controller.js'

const todosRouter = Router()

// obtener todas las tareas
todosRouter.get('/', getAllTodos)
todosRouter.get('/:id', getTodoById)
todosRouter.post('/', createTodo)

todosRouter.put('/:id', (req, res) => {
    res.json({
        success: true,
        message: 'modificado correctaemnte'
    })
})

//TODO: agregar la ruta para elimnar una tarea

export default todosRouter