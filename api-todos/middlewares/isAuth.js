import { sendResponse } from "../helpers/send_response.js";
import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        const [_, token] = authorization.split(' ')
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.headers.id = id

        next()
    } catch (error) {
        return sendResponse({ res, message: 'Debe iniciar sesión', statusCode: 401 })
    }

}