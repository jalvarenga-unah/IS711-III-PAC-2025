
import { Router } from 'express'
import { getAllTodos } from '../controllers/todos.controller.js'

const todosRouter = Router()

// obtener todas las tareas
todosRouter.get('/', getAllTodos)

todosRouter.get('/:id', (req, res) => {

    const { id } = req.params
    // const id = req.params.id

    res.json({
        todo: id,
        queries: req.query
    })
})

todosRouter.post('/', (req, res) => {
    res.status(201).json({
        success: true,
        data: req.body || null,
        foo: 'bar'
    })
})

todosRouter.put('/:id', (req, res) => {
    res.json({
        success: true,
        message: 'modificado correctaemnte'
    })
})

//TODO: agregar la ruta para elimnar una tarea

export default todosRouter