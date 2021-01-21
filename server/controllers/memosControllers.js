import Memo from '../models/memoModel.js'
import asyncHandler from 'express-async-handler'

export const createMemo = asyncHandler(async (req, res) => {
	try {
		const { title, priority, isComplete } = req.body
		const memo = await Memo.create({
			title,
			priority,
			isComplete,
			user: req.user,
		})

		if (memo) {
			res.json({
				_id: memo._id,
				title: memo.title,
				priority: memo.priority,
				isComplete: memo.isComplete,
			})
		} else {
			res.status(400)
			throw new Error('Invalid memo added.')
		}
	} catch (error) {
		res.status(400)
		throw new Error('Sorry, something went wrong. Please try again.')
	}
})

export const getMemo = asyncHandler(async (req, res) => {
	try {
		const memo = await Memo.findById(req.params.id)
		console.log(memo)
		if (!memo) {
			res.status(400)
			throw new Error('Memo not found')
		}
		res.status(200).json(memo)
	} catch (error) {
		res.status(400)
		throw new Error('unexpected error')
	}
})

export const getMemos = asyncHandler(async (req, res) => {
	const user = req.user
	try {
		const memos = await Memo.find({ user })
		if (memos) {
			res.json(memos)
		}
	} catch (error) {
		res.status(400)
		throw new Error('Invalid request please try again.')
	}
})

export const updateMemo = asyncHandler(async (req, res) => {
	try {
		const memo = await Memo.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ new: true }
		)
		if (!memo) return res.status(400).json({ message: 'Memo not found' })
		res.status(200).json({
			_id: memo._id,
			title: memo.title,
			priority: memo.priority,
			isComplete: memo.isComplete,
		})
	} catch (error) {
		res.status(400)
		throw new Error('error updating memo')
	}
})

export const deleteMemo = asyncHandler(async (req, res) => {
	try {
		console.log(req.user.role)
		const memo = await Memo.findByIdAndDelete(req.params.id)
		if (!memo) {
			res.status(400)
			throw new Error('Memo not found')
		}
		res.status(200).json({ message: 'Memo deleted successfully' })
	} catch (error) {
		res.status(400)
		throw new Error('unexpected error please try again')
	}
})
