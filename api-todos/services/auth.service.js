import { pool } from '../db/mysql/db.js'

export class AuthService {


    static async login(email) {

        const [result] = await pool.query('SELECT  BIN_TO_UUID(id) as id, name, email, phone, password_hash, must_change_password FROM users where email = :email', { email })

        return result


    }

    static async changePassword(id, password) {

        const [result] = await pool.query('UPDATE users SET password_hash = :password, must_change_password=0 WHERE id = UUID_TO_BIN(:id)', { id, password })

        return result


    }

}