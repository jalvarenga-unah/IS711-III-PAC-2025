
import { AuthService } from "../services/auth.service.js"
import { sendResponse } from "../helpers/send_response.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


export const login = async (req, res) => {

    // 1. obtener datos de la req
    const { email, password } = req.body

    // 2. verificar que el usuario exista en la base de datos
    //TODO: llamar al service para consultar el usuerio en la BBDD
    const [user] = await AuthService.login(email)

    if (!user) {
        return sendResponse({ res, message: 'Usuario no existe', })
    }

    // 2.1. verificar que el usuario esté activo
    // 3. verificar si debe cambiar contraseña
    if (user.must_change_password) {

        // un "pre-login"
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return sendResponse({
            res, message: 'Debe cambiar la contraseña', data: {
                must_change_password: true,
                token
            }
        })

    }


    // 4. verificar que la contraseña enviada, sea correcta



    // 5. generar un token de sesión

    // 6. respondemos al usuario

    return sendResponse({ res, message: 'Bienvenido', statusCode: 200, data: user })


}

export const changePassword = async (req, res) => {

    const { authorization } = req.headers
    const { password, confirm_password } = req.body

    const [_, token] = authorization.split(' ')

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (password != confirm_password) {
            return sendResponse({ res, message: 'Las contraseñas no son iguales', statusCode: 400 })
        }

        if (password.length < 8) {
            return sendResponse({ res, message: 'La contraseña es muy corta', statusCode: 400 })
        }

        //TODO: revisar porque no genera el hash
        const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT)

        console.log(hash)

        await AuthService.changePassword(id, hash)

        return sendResponse({ res, message: 'Constraseña cambiada correctamente', statusCode: 200, })
    } catch (e) {
        return sendResponse({ res, message: e, statusCode: 400 })
    }

}