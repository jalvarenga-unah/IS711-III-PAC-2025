import express from 'express'; // equivalente al createServer de node:http
import { loadEnvFile } from 'node:process';

import todosRouter from './routes/todos.routes.js'
import { config } from 'zod'
import { es } from "zod/locales"
import { handleError } from './middlewares/handleError.js';

config(es())

loadEnvFile() // carga las variables de entorno desde el archivo .env

const app = express() // <- No requiere la req, res

// Middlewares -> una acción o un metodo, que intercepta las peticiones
app.use(express.json()) // transformar el body de la petición a un formarto json

// app.use(isAuth) //? se puede, pero no es recomendable en este contexto

app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
})

app.use('/todos', todosRouter)


app.use((req, res) => {
    res.status(404).json({
        message: "No existe este recurso"
    })
})

app.use(handleError)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})