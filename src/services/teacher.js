
import pool from "../config/db.js"
import argon from 'argon2'
import path from 'path'
class TeacherService {
    async createTeacher(req) {
        const { fullname, phone, password, experience, job, 
            site, description, facebook, telegram, 
            linkedIn, instagram, gitHub} = req.body
        const hashPassword = await argon.hash(password)
        await pool.query('insert into teachers(fullname, phone, password, experience, job, site, description, facebook, telegram, linked_in, instagram, git_hub) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [fullname, phone, hashPassword, experience, job, site, description, facebook, telegram, linkedIn, instagram, gitHub])
        return {
            status: 201,
            message: 'Teacher created!'
        }
    }

    async getAllTeachers(req) {
        let teachers = await pool.query('select id, fullname, phone, photo, experience, job, site, description, facebook, telegram, linked_in, instagram, git_hub from teachers')
        return {
            status: 200,
            data: teachers.rows
        }
    }

    async deleteTeacher(req) {
        const { id } = req.params
        await pool.query('delete from teachers where id=$1', [id])
        return {
            status: 200,
            message: 'Teacher deleted!'
        }
    }

    async updateTeacher(req) {
        const { id } = req.params
        const {fullname, phone, password,photo, experience, 
            job, site, description, facebook, telegram, 
            linkedIn, instagram, gitHub } = req.body || {}
        let photoName
        if (photo) {
            photoName = Date.now() + path.extname(photo.name)
            photo.mv(path.join(process.cwd(), 'src', 'uploads', photoName), (err) => {
                if(err) {
                    console.log(err)
                }
            })}
        let hashPassword
        if (password) {
            hashPassword = await argon.hash(password)
        }
        await pool.query(`
            UPDATE teachers SET
                fullname = COALESCE($1, fullname),
                phone = COALESCE($2, phone),
                password = COALESCE($3, password),
                photo = COALESCE($4, photo),
                experience = COALESCE($5, experience),
                job = COALESCE($6, job),
                site = COALESCE($7, site),
                description = COALESCE($8, description),
                facebook = COALESCE($9, facebook),
                telegram = COALESCE($10, telegram),
                linked_in = COALESCE($11, linked_in),
                instagram = COALESCE($12, instagram),
                git_hub = COALESCE($13, git_hub)
            WHERE id = $14
        `, [ fullname, phone, hashPassword, photoName, experience,
            job, site, description, facebook, telegram,
            linkedIn, instagram, gitHub, id ])
        return {
            status: 200,
            message: 'Teacher updated!'
        }
    }
}

const teacherService = new TeacherService()
export default teacherService