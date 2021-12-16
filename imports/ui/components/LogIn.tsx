import {
	Alert,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	Snackbar,
	Typography
} from '@mui/material'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
	authOuterDivStyles,
	authInnerDivStyles,
	authInputContainerStyles,
	authInputStyles,
	authButtonStyles
} from './styles'
import { TMeteorError } from '/shared/constants'

export const LogIn = (): React.ReactElement => {
	// TODO: Add redirect
	// TODO: Add email and password validation
	const navigate = useNavigate()
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const [isToastOpen, setIsToastOpen] = React.useState<boolean>(false)
	const user = useTracker(() => Meteor.user())

	React.useEffect(() => {
		// TODO: Make this more seamless
		if (user) navigate('../create-note')
	}, [user])

	const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO: Make this better
		if (!email || !password) return setError('please enter all details')
		setError('')

		Meteor.loginWithPassword({ email }, password, (e: TMeteorError) => {
			const error = e as Meteor.Error
			if (e) setError(error.reason ?? 'There was an unknown error')
			// TODO: redirect to my notes
			else navigate('../my-notes')
		})
	}

	// TODO: Configure this properly
	const handlePasswordReset = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!email) {
			setError('Please enter your email address')
		} else {
			setError('')
			Accounts.forgotPassword({ email })
			setIsToastOpen(true)
			console.log('isToastOpen', isToastOpen)
		}
	}

	return (
		<div style={authOuterDivStyles}>
			<div style={authInnerDivStyles}>
				<form onSubmit={handleLogIn} style={authInputContainerStyles}>
					<Typography style={{ textAlign: 'center' }} variant="h5" gutterBottom component="div">
						Log In
					</Typography>
					<FormControl style={authInputStyles}>
						<InputLabel htmlFor="component-outlined">Email</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							label="email"
							type="email"
						/>
					</FormControl>
					<FormControl style={authInputStyles}>
						<InputLabel htmlFor="component-outlined">Password</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
							label="password"
							type="password"
						/>
					</FormControl>
					<Button
						type="submit"
						style={{ ...authButtonStyles, marginBottom: 10 }}
						variant="contained">
						Log In
					</Button>
					<Button style={{ marginBottom: 10 }} onClick={handlePasswordReset}>
						Forgot Password
					</Button>
					{/* TODO: Make specific errors here and consume properly in inputs */}
					{error && (
						<Typography style={{ textAlign: 'center', color: 'red', marginBottom: 10 }}>
							{error}
						</Typography>
					)}
				</form>
			</div>
			<div style={{ width: 300, margin: '24px auto' }}>
				<Link style={{ textDecoration: 'none' }} to="/sign-up">
					Don&apos;t have an account? Sign up instead.
				</Link>
			</div>
			{/* TODO: Decentralize snackbars */}
			<Snackbar open={isToastOpen} autoHideDuration={6000} onClose={() => setIsToastOpen(false)}>
				<Alert variant="filled" severity="info">
					A link to reset your password has been sent to the email you entered.
				</Alert>
			</Snackbar>
		</div>
	)
}
