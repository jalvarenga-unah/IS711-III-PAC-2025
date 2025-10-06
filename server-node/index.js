
// mi primer servidor web con node js
import { createServer } from 'node:http'

// 1. Crear el servidor
// ya es mi servidor web
const app = createServer((req, res) => {

    console.log(req.url)
    // console.log(req.headers)
    console.log(req.body)
    console.log(req.method)

    // 4. Se le da respuesta al usuario
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"message":"Hola mundo desde node js"}') // finalizar la petición
    // res.end('<h1>Hola mundo</h1>') // finalizar la petición

})

// 2. establecer un puerto
const PORT = 3000


// 3. escuchar el servidor
app.listen(PORT, () => {
    console.log('El servidor está en marcha en: ')
    console.log(`http://localhost:${PORT}`)
})