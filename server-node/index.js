
// mi primer servidor web con node js
import { createServer } from 'node:http'
import { loadEnvFile } from 'node:process';

loadEnvFile() // carga las variables de entorno desde el archivo .env

// 1. Crear el servidor
// ya es mi servidor web
const app = createServer((req, res) => {

    //GET: consulto
    //POST: creo
    //PUT: actualizo
    //DELETE: elimino

    switch (req.method) {
        case 'GET':
            console.log('El usuario está consultando información')

            switch (req.url) {

                case '/todos':
                    // res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end('{"message":"se obtuvieron todas las tareas"') // finalizar la petición
                    break;
                case '/todos/abc123':
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end('{"message":"se obtuvo la tarea con id abc123"}') // finalizar la petición
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end('{"message":"ruta no encontrada"}') // finalizar la petición
                    break;
            }

            break;
        case 'POST':
            console.log(req.body)
            console.log('El usuario está creando información')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"message":"se creó una nueva tarea"}') // finalizar la petición
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end('{"message":"método no permitido"}') // finalizar la petición
            break;
    }

})

// 2. establecer un puerto''

//variables de entorno
const PORT = process.env.PORT || 3000


// 3. escuchar el servidor
app.listen(PORT, () => {

    const PORT = app.address().port // me retorna el puerto que está usando el servidor

    console.log('El servidor está en marcha en: ')
    console.log(`http://localhost:${PORT}`)
})