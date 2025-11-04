import { pool } from '../db/mysql/db.js'

export class AuthService {


    static async login(email) {

        const [result] = await pool.query('SELECT  BIN_TO_UUID(id) as id, name, email, phone, password_hash, must_change_password FROM users where email = :email', { email })

        return result


    }


}