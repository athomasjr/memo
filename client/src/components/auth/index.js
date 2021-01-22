import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authUser } from '../../store/actions/usersActions'
import { Button, TextField } from '@material-ui/core'

export default function Auth(props) {
	const [register, setRegister] = useState(false)
	const dispatch = useDispatch()

	const handleSubmit = (values) => {
		if (register) {
			dispatch(authUser(values, 'register'))
		} else {
			dispatch(authUser(values, 'login'))
		}
	}

	const formik = useFormik({
		initialValues: {
			email: 'test2@mail.com',
			password: 'test2',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required('Sorry your email is required')
				.email('This is not a valid email'),
			password: Yup.string().required('Sorry your password is required'),
		}),
		onSubmit: (values, { resetForm }) => {
			handleSubmit(values)
		},
	})

	return (
		<div
			style={{
				width: '50%',
				marginRight: 'auto',
				marginLeft: 'auto',
			}}
			className='flex-column mt-5 text-center'
		>
			<h1>Authenticate</h1>
			<form className='align-middle mt-5' onSubmit={formik.handleSubmit}>
				<div className='form-group'>
					<TextField
						style={{ width: '100%' }}
						name='email'
						label='enter your email'
						variant='outlined'
						{...formik.getFieldProps('email')}
					/>
				</div>
				<div className='form-group'>
					<TextField
						style={{ width: '100%' }}
						name='password'
						type='password'
						label='enter your password'
						variant='outlined'
						{...formik.getFieldProps('password')}
					/>
				</div>
				<Button
					style={{ width: '100%' }}
					type='submit'
					variant='contained'
					color='primary'
				>
					{register ? 'Register' : 'Login'}
				</Button>
				<Button
					className='mt-3'
					style={{ width: '100%' }}
					variant='outlined'
					color='secondary'
					type='submit'
					size='small'
					onClick={() => setRegister(!register)}
				>
					Want to {!register ? 'Register' : 'Login'} ?
				</Button>
			</form>
		</div>
	)
}
