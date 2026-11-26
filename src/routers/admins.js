import express from 'express'
import adminController from '../controllers/admins.js'
import middleware from '../middleware/validation.js'
const router = express.Router()

router
    .get('/api/v1/admins/all', adminController.getAllAdmins)
    .post('/api/v1/admins', middleware.createAdmin , adminController.createAdmin)
    .delete('/api/v1/admins/:id', middleware.checkId('admins'), adminController.deleteAdmin)
    .put('/api/v1/admins/:id', middleware.checkId('admins'), middleware.checkData, adminController.updateAdmin)
export default router