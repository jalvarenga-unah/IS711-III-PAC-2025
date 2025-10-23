import { sendResponse } from "../helpers/send_response.js";

//TODO: aplicar mecaniscmo real de autenticación

export const isAuth = async (req, res, next) => {

    setTimeout(() => {
        const r = Math.floor(Math.random() * 10);
        console.log(r)
        if (r % 2 != 0) {
            return sendResponse({ res, message: 'debe iniciar sesión', statusCode: 401 })
        }
        next() // sin esto, no puede continuar con el flujo
    }, 500)

}