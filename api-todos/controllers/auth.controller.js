
import { AuthService } from "../services/auth.service.js"
import { sendResponse } from "../helpers/send_response.js"
import jwt from 'jsonwebtoken'

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
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: '3m' });

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