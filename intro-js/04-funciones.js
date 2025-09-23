

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



const crearMascota = ({ nombre, raza, edad = 0 }) => {

    return {
        nombre,
        edad,
        raza
    }

}

const data = { nombre: 'Luna', raza: 'Pastor Alemán', color: 'Negro' }

console.log(crearMascota(data))
console.log(crearMascota({ edad: 3, nombre: 'Apolo', raza: 'Terrier' }))