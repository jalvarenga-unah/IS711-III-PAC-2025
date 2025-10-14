import express from 'express'; // equivalente al createServer de node:http
import { appDistribution } from 'firebase-functions/alerts';
import { loadEnvFile } from 'node:process';

loadEnvFile() // carga las variables de entorno desde el archivo .env

const app = express() // <- No requiere la req, res

// Middlewares -> una acción o un metodo, que intercepta las peticiones
app.use(express.json()) // transformar el body de la petición a un formarto json


app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
})

app.get('/todos', (req, res) => {
    res.json({ "todos": [], "queries": req.query })
})

app.get('/todos/:id', (req, res) => {

    const { id } = req.params
    // const id = req.params.id

    res.json({
        todo: id,
        queries: req.query
    })
})

app.post('/todos', (req, res) => {
    res.status(201).json({
        success: true,
        data: req.body || null,
        foo: 'bar'
    })
})

app.put('/todos/:id', (req, res) => {
    res.json({
        success: true,
        message: 'modificado correctaemnte'
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: "No existe este recurso"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})