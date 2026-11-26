import pool from '../config/db.js'
import argon from 'argon2'
import path from 'path'
class AdminService{
    async getAllAdmins(req) {
        let admins = await pool.query('select id, photo, fullname, phone, created_at, status from admins')
        return {
            status: 200,
            data: admins.rows
        }
    }

    async createAdmin(req) {
        const { fullname, phone, password } = req.body
        let excistAdmin = await pool.query('select * from admins where phone=$1', [phone])
        if (excistAdmin.rows.length) {
            return {
                status: 400,
                message: 'Admin already excisted!'
            }
        }
        const hashPassword = await argon.hash(password)
        await pool.query('insert into admins(fullname, phone, password) values($1, $2, $3)', [fullname, phone, hashPassword])
        return {
            status: 201,
            message: 'Admin created!'
        }
    }

    async deleteAdmin(req) {
        const { id } = req.params
        await pool.query('delete from admins where id=$1', [id])
        return {
            status: 200,
            message: 'Admin deleted!'
        }
    }

    async updateAdmin(req) {
        const { id } = req.params
        const { fullname, phone, password } = req.body || {}
        const { photo } = req.files || {}
        let photoName
        if (photo) {
            photoName = Date.now() + path.extname(photo.name)
            photo.mv(path.join(process.cwd(), 'src', 'uploads', photoName), (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
        let hashPassword
        if (password) {
            hashPassword = await argon.hash(password)
        }
        let str = ''
        str += fullname ? `fullname='${fullname}'` : ''
        str += phone ? (fullname ? `, phone='${phone}'` : `phone='${phone}'`) : ''
        str += password ? (fullname || phone ? `, password='${hashPassword}'` : `password='${hashPassword}'`) : ''
        str += photo ? (fullname || phone || password ? `, photo='/uploads/${photoName}'` : `photo='/uploads/${photoName}'`) : ''
        await pool.query(`update admins set ${str} where id=$1`, [id])
        return {
            status: 200,
            message: 'Admin updated!'
        }
    }
}

const adminService = new AdminService()

export default adminService