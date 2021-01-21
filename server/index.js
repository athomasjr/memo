import express from 'express'
import { config } from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middleware/error.js'
import userRoutes from './routes/api/users.js'
import memoRoutes from './routes/api/memos.js'

config()
const app = express()

export const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
connectDb(mongoUri)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/memos', memoRoutes)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, () =>
	console.log(`running on port ${port}`.underline.bold.yellow)
)
