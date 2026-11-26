import express from 'express'
import middleware from '../middleware/validation.js'
import teacherController from '../controllers/teachers.js'
const router = express.Router()
router 
    .post('/api/v1/teachers', middleware.createTeacher, teacherController.createTeacher)
    .get('/api/v1/teachers/all', teacherController.getAllTeachers)
    .delete('/api/v1/teachers/:id', middleware.checkId('teachers'), teacherController.deleteTeacher)
    .put('/api/v1/teachers/:id', middleware.checkId('teachers'), middleware.checkTeacherData, teacherController.updateTeacher)
export default router