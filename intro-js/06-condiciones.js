const n = 10 // numerico

if (n > 5) {
    console.log('n es mayor que 5')
} else {
    console.log('n es menor o igual que 5')
}

/*
falsy: false, 0, ""
nulish: null, undefined
truthy: todo lo demas, [], {}
*/

// == : comparando el valor
// === : comparando el valor y el tipo de dato
if (n === '10') {
    console.log('n es 10')
} else {
    console.log('n no es 10')
}

test = Number('wjehf') // NaN es de tipo Number

console.log(test)

if (isNaN(test)) {
    console.log('La condición se cumple')
}