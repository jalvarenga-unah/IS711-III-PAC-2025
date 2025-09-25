import { sumar, restar } from './module/funciones.mjs'
// import substraccion from './module/funciones.mjs'
import { platform, freemem, totalmem, uptime, version, userInfo } from 'node:os'
// const os = reqired('node:os') // common js

console.log(sumar(3, 3))
console.log(restar(3, 3))
console.log(platform())
console.log(freemem() / 1024 / 1024 / 1024)
console.log(totalmem() / 1024 / 1024 / 1024)
console.log(uptime() / 60 / 60) // horas
console.log(version())
console.log(userInfo())

