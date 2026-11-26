import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv()
import fileUpload from 'express-fileupload'
import path from 'path'
import adminsRouter from './routers/admins.js'
import teacherRouter from './routers/teachers.js'
const app = express()
app.use(express.json())
app.use(fileUpload())
app.use('/uploads', express.static(path.join(process.cwd(),'src', 'uploads')))
app.use(adminsRouter)
app.use(teacherRouter)

app.listen(process.env.PORT, () => console.log('Server is running...'))