import adminService  from "../services/admin.js";
class AdminController{
    async getAllAdmins(req, res) {
        let resData = await adminService.getAllAdmins(req)
        res.status(resData.status).json(resData)
    }

    async createAdmin(req, res) {
        let resData = await adminService.createAdmin(req)
        res.status(resData.status).json(resData)
    }

    async deleteAdmin(req, res) {
        let resData = await adminService.deleteAdmin(req)
        res.status(resData.status).json(resData)
    }

    async updateAdmin(req, res) {
        let resData = await adminService.updateAdmin(req)
        res.status(resData.status).json(resData)
    }
}

const adminController = new AdminController()

export default adminController