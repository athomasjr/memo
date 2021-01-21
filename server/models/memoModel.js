import mongoose from 'mongoose'
const { Schema } = mongoose

const memoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			enum: ['none', 'low', 'medium', 'high'],
			required: true,
			default: 'none',
			index: true,
		},
		isComplete: {
			type: Boolean,
			required: true,
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Memo = mongoose.model('Memo', memoSchema)

export default Memo
