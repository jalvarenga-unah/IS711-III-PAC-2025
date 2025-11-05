
import { Router } from 'express'
import { login, changePassword } from '../controllers/auth.controller.js'



const authRoutes = Router()

// endpoint para hacer login
authRoutes.post('/login', login)
// endpoint para hacer cambiar contraseña
authRoutes.put('/change-password', changePassword)
// endpoint para hacer recuperar contraseña
authRoutes.post('/recover-password', (req, res) => { })


export default authRoutes

