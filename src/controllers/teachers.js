import teacherService from "../services/teacher.js"
class TeacherController {
    async createTeacher (req, res) {
        let resData = await teacherService.createTeacher(req)
        return res.status(resData.status).json(resData)
    }

    async getAllTeachers (req, res) {
        let resData = await teacherService.getAllTeachers(req)
        return res.status(resData.status).json(resData)
    }

    async deleteTeacher (req, res) {
        let resData = await teacherService.deleteTeacher(req)
        return res.status(resData.status).json(resData)
    }

    async updateTeacher (req, res) {
        let resData = await teacherService.updateTeacher(req)
        return res.status(resData.status).json(resData)
    }
}

const teacherController = new TeacherController()

export default teacherController