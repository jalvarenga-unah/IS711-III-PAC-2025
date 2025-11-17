import express from 'express'; // equivalente al createServer de node:http
import cors from 'cors'
import { loadEnvFile } from 'node:process';
import { rateLimit } from 'express-rate-limit'
import todosRouter from './routes/todos.routes.js'
import { config } from 'zod'
import { es } from "zod/locales"
import { handleError } from './middlewares/handleError.js';
import authRoutes from './routes/auth.routes.js';

config(es())

loadEnvFile() // carga las variables de entorno desde el archivo .env

const app = express() // <- No requiere la req, res

app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'https://test.misuperapp.com',
        'https://misuperapp.com',
    ],
    methods: 'GET,POST, PUT, OPTIONS'
})) // permitiendo todos los origenes para consumir el API


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: {
        message: 'Oye Oye, tranquilo viejo'
    }
})

app.use(limiter)

// Middlewares -> una acción o un metodo, que intercepta las peticiones
app.use(express.json()) // transformar el body de la petición a un formarto json

// app.use(isAuth) //? se puede, pero no es recomendable en este contexto

app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
})

app.use('/todos', todosRouter)
app.use('/auth', authRoutes)


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