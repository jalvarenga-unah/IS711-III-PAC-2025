

function saludar(nombre) {
    return `hola ${nombre}`
}

// función anonima
const saludo = function (nombre) {
    return `hola ${nombre}`
}

const saludo2 = (nombre) => ({ msg: `hola ${nombre}` })// return implicito

const saludo3 = function (nombre) {

    if (!nombre) {
        throw new Error('El nombre es obligatorio')
    }

    return { msg: `hola ${nombre}` }
}

saludar = 'Holaaa'
// saludo = 'Holaaa' // ❌ no se puede reasignar

console.log(saludar)
// console.log(saludar('Juan'))
console.log(saludo('enrique'))
console.log(saludo2('Pedro'))