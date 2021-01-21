import { Router } from 'express'
import {
	registerUser,
	authUser,
	getUserProfile,
	updateUserProfile,
} from '../../controllers/usersControllers.js'
import { checkToken } from '../../middleware/auth.js'
import { grantAccess } from '../../middleware/grantAccess.js'

const router = Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
	.route('/profile')
	.get(checkToken, grantAccess('readOwn', 'profile'), getUserProfile)
	.patch(checkToken, grantAccess('updateOwn', 'profile'), updateUserProfile)

export default router
