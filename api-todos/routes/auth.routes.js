
import { Router } from 'express'
import { login } from '../controllers/auth.controller.js'



const authRoutes = Router()

// endpoint para hacer login
authRoutes.post('/login', login)
// endpoint para hacer cambiar contraseña
authRoutes.put('/change-password', (req, res) => { })
// endpoint para hacer recuperar contraseña
authRoutes.post('/change-password', (req, res) => { })


export default authRoutes

