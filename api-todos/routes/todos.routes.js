
import { Router } from 'express'
import { createTodo, getAllTodos, getTodoById } from '../controllers/todos.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const todosRouter = Router()

todosRouter.use((req, res, next) => {
    next()
})

// obtener todas las tareas
todosRouter.get('/', getAllTodos)
todosRouter.get('/:id', getTodoById)
todosRouter.post('/', isAuth, createTodo)

todosRouter.put('/:id', [isAuth], (req, res) => {
    res.json({
        success: true,
        message: 'modificado correctaemnte'
    })
})

//TODO: agregar la ruta para elimnar una tarea

export default todosRouter