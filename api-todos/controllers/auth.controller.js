
import { AuthService } from "../services/auth.service"
import { sendResponse } from "../helpers/send_response.js"


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





    // 4. verificar que la contraseña enviada, sea correcta

    // 5. generar un token de sesión

    // 6. respondemos al usuario



}