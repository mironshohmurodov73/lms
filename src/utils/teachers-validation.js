import Joi from 'joi'

export const teacherScheme = Joi.object({
    fullname: Joi.string().min(3).required(),
    phone: Joi.string().pattern(/^998(33|50|55|77|88|90|91|93|94|95|97|98|99|20|71)\d{7}$/).required(),
    password: Joi.string().min(6).required(),
    experience: Joi.string().max(15),
    job: Joi.string().max(20),
    site: Joi.string().uri(),
    description: Joi.string().max(100),
    facebook: Joi.string().uri(),
    telegram: Joi.string().uri(),
    linkedIn: Joi.string().uri(),
    instagram: Joi.string().uri(),
    gitHub: Joi.string().uri()  
})