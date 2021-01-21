import mongoose from 'mongoose'

const connectDb = async (uri) => {
	try {
		const conn = await mongoose.connect(uri, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		})
		console.log(`MongoDB connected to ${conn.connection.host}`.white.underline)
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDb
