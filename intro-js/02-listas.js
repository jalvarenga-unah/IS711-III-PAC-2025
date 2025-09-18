
const numeros = [10, 20, 30, 40, 50]

// desestructuración (... spread operator)
const copia = [...numeros]

numeros.push(1)
numeros.pop()
numeros.shift() // elimina el primer elemento
numeros.unshift(100) // inserta un valor en el primer elemento
numeros.splice(2, 1)
numeros[0] = 900 // asingnación por índice
numeros.push('Cual quier cosa')

console.log(numeros)
console.log(copia)

// desestructurar un array

const [primero, segundo, ...resto] = copia
console.log(primero)
console.log(segundo)
console.log(resto)

// const primero = copia[0]
// const segundo = copia[1]




