
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

export const sendEmail = async (req, res, next) => {

    const { email } = req.body

    try {

        const [user] = await AuthService.login(email)

        console.log('test')

        if (!user) {
            return sendResponse({
                res,
                message: 'Este correo no existe en el sistema',
                statusCode: 400,
                data
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '10m'
        })


        const url = 'https://localhost:3000/recover-password?token=' + token

        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log(user)
        const { data, error } = await resend.emails.send({
            from: 'UNAH-Cortés <noresponder@esshn.com>',
            to: [user.email],
            subject: 'Recupreación de contraseña',
            html: emailRecoverPAssword(url)
        });

        return sendResponse({
            res,
            message: 'Se envió un correo con instrucciones para reestablecer la contraseña',
            statusCode: 200,
            data
        })

    } catch (error) {
        next(error)
    }
}

const emailRecoverPAssword = (url) => {

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-obm5k5sw5-resend.vercel.app/static/dropbox-logo.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body style="background-color:rgb(246,249,252)">
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="background-color:rgb(246,249,252);padding-bottom:10px;padding-top:10px">
            <div
              style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
              data-skip-in-text="true">
              Dropbox reset your password
              <div>
                 ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
              </div>
            </div>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:37.5em;background-color:rgb(255,255,255);border-style:solid;border-width:1px;border-color:rgb(240,240,240);padding:45px">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <img
                      alt="Dropbox"
                      height="33"
                      src="https://react-email-demo-obm5k5sw5-resend.vercel.app/static/dropbox-logo.png"
                      style="display:block;outline:none;border:none;text-decoration:none"
                      width="40" />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:16px;line-height:26px;font-family:Open Sans,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:300;color:rgb(64,64,64);margin-top:16px;margin-bottom:16px">
                              Hi
                              <!-- -->Alan<!-- -->,
                            </p>
                            <p
                              style="font-size:16px;line-height:26px;font-family:Open Sans,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:300;color:rgb(64,64,64);margin-top:16px;margin-bottom:16px">
                              Someone recently requested a password change for
                              your Dropbox account. If this was you, you can set
                              a new password here:
                            </p>
                            <a
                              href="${url}"
                              style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:rgb(0,126,230);border-radius:0.25rem;color:rgb(255,255,255);font-size:15px;text-decoration-line:none;text-align:center;font-family:Open Sans,Helvetica Neue,Arial;width:210px;padding-bottom:14px;padding-top:14px;padding-right:7px;padding-left:7px"
                              target="_blank"
                              ><span
                                ><!--[if mso]><i style="mso-font-width:350%;mso-text-raise:21" hidden>&#8202;</i><![endif]--></span
                              ><span
                                style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px"
                                >Reset password</span
                              ><span
                                ><!--[if mso]><i style="mso-font-width:350%" hidden>&#8202;&#8203;</i><![endif]--></span
                              ></a
                            >
                            <p
                              style="font-size:16px;line-height:26px;font-family:Open Sans,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:300;color:rgb(64,64,64);margin-top:16px;margin-bottom:16px">
                              If you don&#x27;t want to change your password or
                              didn&#x27;t request this, just ignore and delete
                              this message.
                            </p>
                            <p
                              style="font-size:16px;line-height:26px;font-family:Open Sans,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:300;color:rgb(64,64,64);margin-top:16px;margin-bottom:16px">
                              To keep your account secure, please don&#x27;t
                              forward this email to anyone. See our Help Center
                              for<!-- -->
                              <a
                                href="https://www.dropbox.com"
                                style="color:#067df7;text-decoration-line:underline"
                                target="_blank"
                                >more security tips.</a
                              >
                            </p>
                            <p
                              style="font-size:16px;line-height:26px;font-family:Open Sans,HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:300;color:rgb(64,64,64);margin-top:16px;margin-bottom:16px">
                              Happy Dropboxing!
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`
}