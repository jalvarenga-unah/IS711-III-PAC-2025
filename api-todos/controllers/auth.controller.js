
import { AuthService } from "../services/auth.service.js"
import { sendResponse } from "../helpers/send_response.js"
import jwt from 'jsonwebtoken'
// import bcrypt from "bcrypt"
import argon2 from 'argon2'
import { Resend } from 'resend';


export const login = async (req, res, next) => {

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
    try {
        const verifyPassword = await argon2.verify(user.password_hash, password)

        if (!verifyPassword) {
            return sendResponse({ res, message: 'Datos incorrectos', statusCode: 404 })
        }


        const token = jwt.sign({
            id: user.id,
            name: user.name
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1y' });

        // eliminar propiedades innecesarias
        delete user.id
        delete user.password_hash
        user.token = token


        return sendResponse({ res, message: 'Bienvenido', statusCode: 200, data: user })

    } catch (e) {
        next(e)
    }

}

export const changePassword = async (req, res) => {
    const { password, confirm_password } = req.body
    const { id } = req.headers

    try {

        if (password != confirm_password) {
            return sendResponse({ res, message: 'Las contraseñas no son iguales', statusCode: 400 })
        }

        if (password.length < 8) {
            return sendResponse({ res, message: 'La contraseña es muy corta', statusCode: 400 })
        }

        const hash = await argon2.hash(password)

        await AuthService.changePassword(id, hash)

        return sendResponse({ res, message: 'Constraseña cambiada correctamente', statusCode: 200, })
    } catch (e) {
        return sendResponse({ res, message: e, statusCode: 400 })
    }

}

export const sendEmail = async (req, res) => {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'UNAH-Cortés <noresponder@esshn.com>',
        to: ['jealvarengar@unah.edu.hn'],
        subject: 'Hello World',
        html: '<strong>Mi primer correo enviado!</strong>',
    });


    return sendResponse({
        res,
        message: 'SE envió un correo con instrucciones para reestablecer la contraseña',
        statusCode: 200,
        data
    })

}