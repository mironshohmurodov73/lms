import Joi from "joi";

export const adminScheme = Joi.object({
    fullname: Joi.string().min(3).required(),
    phone: Joi.string().pattern(/^998(33|50|55|77|88|90|91|93|94|95|97|98|99|20|71)\d{7}$/).required(),
    password: Joi.string().min(6).required()
})

export const checkFile = (file) => {
    const allowType = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/gif']
    if (!allowType.includes(file.mimetype)) {
        return false
    }

    return true
}
