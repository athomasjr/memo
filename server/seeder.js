import connectDb from './config/db.js'
import { mongoUri } from './index.js'
import User from './models/userModel.js'
import Memo from './models/memoModel.js'
import { config } from 'dotenv'

config()
connectDb(mongoUri)

const destroyData = async () => {
	try {
		await User.deleteMany()
		await Memo.deleteMany()
		console.log(`Data Destroyed`.red.inverse)
		process.exit
	} catch (error) {
		console.log(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
}
