// objetos, diccionarios, mapas, json

const mascota = {
    "nombre": "Apolo",
    "edad": 3,
    "vacunas aplicadas": ["rabia", "parvovirus", "moquillo"],
    // "nombre": "Firulais", // se sobreescribe el valor original
    // 4: "cuatro", ❌ es válido pero no es recomendable
}

console.log(mascota["nombre"])
mascota.edad = 4
console.log(mascota.edad)

//agregando una nueva propiedad
mascota.raza = 'Terrier'

mascota.apodo = null

//eliminando una propiedad
delete mascota.edad

console.log(mascota)

// desestructuración de objetos

const nombre = 'Juan Alvarenga'

const {
    nombre: nombre_mascota, // renombrando la variable
    raza,
    "vacunas aplicadas": vacunas_aplicadas,
} = mascota

console.log(nombre_mascota, raza)
console.log(vacunas_aplicadas)

