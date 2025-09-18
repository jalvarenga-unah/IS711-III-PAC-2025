console.log('Hola mundo')
// console.log(window) // ❌ no funciona en Node.js
// console.log(this) // ✅ funciona en Node.js

//? let o const ( legacy: var )
// var edad = 30
// var edad = 20 // una referencia a la misma variable

// una forma de declarar variables cuyo valor puede cambiar
let nombre = 'Juan'
nombre = 'Pedro'

console.log(nombre)

// const, es una forma de declarar variables cuyo valor no puede cambiar
const apellido = 'Pérez'
// apellido = 'Gómez' // ❌ Error

console.log(apellido)

// scope / ámbito
{
    let nombre = 'Ana'
    console.log(nombre)
}

console.log(nombre + ' ' + apellido)
console.log(`Mi nombre 
    es: ${nombre} ${apellido}
    mi edad es: ${30 + 5}`) // template string o template literal