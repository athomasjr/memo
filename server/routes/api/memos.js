import { Router } from 'express'
import {
	createMemo,
	updateMemo,
	getMemos,
	deleteMemo,
	getMemo,
} from '../../controllers/memosControllers.js'
import { grantAccess } from '../../middleware/grantAccess.js'
import { checkToken } from '../../middleware/auth.js'

const router = Router()

router
	.route('/')
	.post(checkToken, createMemo)
	.get(checkToken, grantAccess('readOwn', 'memo'), getMemos)

router
	.route('/:id')
	.get(checkToken, grantAccess('readOwn', 'memo'), getMemo)
	.patch(checkToken, grantAccess('updateOwn', 'memo'), updateMemo)
	.delete(checkToken, grantAccess('deleteOwn', 'memo'), deleteMemo)

export default router
