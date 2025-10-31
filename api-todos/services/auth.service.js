import { pool } from '../db/mysql/db.js'

export class AuthService {


    static async login(email) {

        const [result] = await pool.query('SELECT *FROM users where email = :email', { email })

        return result


    }


}