


const crearMascota = ({ nombre, raza, edad = 0 }) => {
    // Estados de las promesas:
    /*
        1. Pending (pendiente)
        2. Fulfilled (aceptada)
        3. Rejected (rechazada)
     */

    return new Promise(function (resolve, reject) {
        setTimeout(() => {

            const random = Math.random() // 0 - 1

            if (random < 0.5) {
                resolve({
                    nombre,
                    raza,
                    edad
                })

            } else {

                reject('Error al crear la mascota')
            }
        }, 2000)
    })
}

// formas de resolver una promesa

// asincrónico y sincrónico

const mascota1 = { nombre: 'Firulais', raza: 'Pastor Alemán', edad: 5 }
const mascota2 = { nombre: 'Michi', raza: 'Siames', edad: 3 }
const mascota3 = { nombre: 'Nemo', raza: 'Pez Payaso' }

console.log('Inicio de la creación de la mascota')
crearMascota(mascota1)
    .then((respuesta) => {
        console.log('Mascota1 creada:', respuesta)
    })
    .catch((error) => {
        console.error('Mascota1 ' + error)
    })


crearMascota(mascota2)
    .then((respuesta) => {
        console.log('Mascota2 creada:', respuesta)
    })
    .catch((error) => {
        console.error('Mascota2 ' + error)
    })

crearMascota(mascota3)
    .then((respuesta) => {
        console.log('Mascota3 creada:', respuesta)
    })
    .catch((error) => {
        console.error('Mascota3 ' + error)

    })

console.log('Final de la creación de la mascota')