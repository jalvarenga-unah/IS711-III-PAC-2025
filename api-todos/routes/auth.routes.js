
import { Router } from 'express'
import { login, changePassword, sendEmail } from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/isAuth.js'



const authRoutes = Router()

// endpoint para hacer login
authRoutes.post('/login', login)
// endpoint para hacer cambiar contraseña
authRoutes.put('/change-password', isAuth, changePassword)
// endpoint para hacer recuperar contraseña
authRoutes.post('/recover-password', sendEmail)


export default authRoutes

