import AccessControl from 'accesscontrol'

const adminGlobal = {
	'create:any': ['*'],
	'read:any': ['*'],
	'update:any': ['*'],
	'delete:any': ['*'],
}

let grantObject = {
	admin: {
		profile: adminGlobal,
		memo: adminGlobal,
	},
	user: {
		profile: {
			'read:own': ['*', '!_id', '!password', '!date'],
			'update:own': ['*'],
		},
		memo: {
			'create:own': ['*'],
			'read:own': ['*'],
			'update:own': ['*'],
			'delete:own': ['!*'],
		},
	},
}

export const roles = new AccessControl(grantObject)
