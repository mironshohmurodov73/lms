import { adminScheme } from "../utils/admins-validation.js";
import { checkFile } from "../utils/admins-validation.js";
import { teacherScheme } from "../utils/teachers-validation.js";
import pool from "../config/db.js";
export default {
    createAdmin: (req, res, next) => {
        const { error } = adminScheme.validate(req.body)
        if(error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }

        next()
    },

    checkId: (tableName) => {
        return async (req, res, next) => {
            const { id } = req.params
            const excistData = await pool.query(`select * from ${tableName} where id=$1`, [id])
            if(!excistData.rows.length) {
                return res.status(404).json({
                    status: 404,
                    message: `${tableName} undefined with this id!`
                })
            }

            next()
        }
    },

    checkData: async (req, res, next) => {
        let { fullname, phone, password } = req.body || {}
        const { photo } = req.files || {}
        if (!fullname && !phone && !password && !photo) {
            return res.status(400).json({
                status: 400,
                message: 'Nothing shared!'
            })
        }
        const fullnameError = adminScheme.extract('fullname').validate(fullname).error
        const phoneError = adminScheme.extract('phone').validate(phone).error
        const passwordError = adminScheme.extract('password').validate(password).error
        if (fullname && fullnameError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Fullname' + fullnameError.message
            })
        }

        if (phone && phoneError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Phone' + phoneError.message
             })
        }

        if (password && passwordError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Password' + passwordError.message
            })
        }
        
        if(photo && !checkFile(photo)) {
            return res.status(415).json({
                status: 415,
                message: 'Unsupported media type!'
            })
        }        
        next()
    },

    createTeacher: (req, res, next) => {
        const { error } = teacherScheme.validate(req.body)
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        }
        
        next()
    },

    checkTeacherData: (req, res, next) => {
        const {fullname, phone, password, experience, 
            job, site, description, facebook, telegram, 
            linkedIn, instagram, gitHub } = req.body || {}
        const { photo} = req.files || {}
        if (!fullname && !phone && !password && !photo && !experience && !job && !site && !description && !facebook && !telegram && !linkedIn && !instagram && !gitHub) {
            return res.status(400).json({
                status: 400,
                message: 'Nothing shared!'
            })
        }
        const fullnameError = teacherScheme.extract('fullname').validate(fullname).error
        const phoneError = teacherScheme.extract('phone').validate(phone).error
        const passwordError = teacherScheme.extract('password').validate(password).error
        const experienceError = teacherScheme.extract('experience').validate(experience).error
        const jobError = teacherScheme.extract('job').validate(job).error
        const siteError = teacherScheme.extract('site').validate(site).error
        const descriptionError = teacherScheme.extract('description').validate(description).error
        const facebookError = teacherScheme.extract('facebook').validate(facebook).error
        const telegramError = teacherScheme.extract('telegram').validate(telegram).error
        const linkedInError = teacherScheme.extract('linkedIn').validate(linkedIn).error
        const instagramError = teacherScheme.extract('instagram').validate(instagram).error
        const gitHubError = teacherScheme.extract('gitHub').validate(gitHub).error
        
         if (fullname && fullnameError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Fullname' + fullnameError.message
            })
        }

        if (phone && phoneError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Phone' + phoneError.message
             })
        }

        if (password && passwordError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Password' + passwordError.message
            })
        }
        
        if (experience && experienceError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Experience' + experienceError.message
            })
        }

        if (job && jobError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Job' + jobError.message
            })
        }

        if (site && siteError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Site' + siteError.message
            })
        }

        if (description && descriptionError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Description' + descriptionError.message
            })
        }

        if (facebook && facebookError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Facebook' + facebookError.message
            })
        }

        if (telegram && telegramError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Telegram' + telegramError.message
            })
        }

        if (linkedIn && linkedInError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Linked In' + linkedInError.message
            })
        }

        if (instagram && instagramError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Instagram' + instagramError.message
            })
        }

        if (gitHub && gitHubError) {
            return res.status(400).json({ 
                status: 400,
                message: 'Git Hub' + gitHubError.message
            })
        }

        if(photo && !checkFile(photo)) {
            return res.status(415).json({
                status: 415,
                message: 'Unsupported media type!'
            })
        } 

        next()
    }
}

