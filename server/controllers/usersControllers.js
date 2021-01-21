import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

export const registerUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body
		const userExists = await User.findOne({ email })
		if (userExists) {
			res.status(400)
			throw new Error('User already exists')
		}

		const user = await User.create({
			email,
			password,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				email: user.email,
				role: user.role,
				token: generateToken(user._id),
			})
		} else {
			res.status(400)
			throw new Error('Invalid user data')
		}
	} catch (error) {
		res.status(400)
		res.json({ message: 'An error occurred', error })
	}
})

export const updateUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $set: req.body },
			{ new: true }
		)
		if (!user)
			return res
				.status(400)
				.json({ message: 'There was an error. Could not update account.' })
		res.status(200).json({
			_id: user._id,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		})
	} catch (error) {
		res.status(400).json({ message: 'Problem updating', error })
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

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export const getUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		if (user) {
			res.json({ _id: user._id, email: user.email, role: user.role })
		} else {
			res.status(404)
			throw new Error('User not found')
		}
	} catch (error) {
		res.status(400)
		res.json({ message: 'An error occurred, please try again', error })
	}
})
