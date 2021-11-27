import { Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'
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
						/>
					</FormControl>
					<FormControl style={authInputStyles}>
						<InputLabel htmlFor="component-outlined">Password</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
							label="password"
						/>
					</FormControl>
					<Button type="submit" style={authButtonStyles} variant="contained">
						Log In
					</Button>
					{/* TODO: Make specific errors here and consume properly in inputs */}
					{error && <Typography style={{ textAlign: 'center', color: 'red' }}>{error}</Typography>}
				</form>
			</div>
			<div style={{ width: 300, margin: '40px auto' }}>
				<Link style={{ textDecoration: 'none' }} to="/sign-up">
					Don&apos;t have an account? Sign up instead.
				</Link>
			</div>
		</div>
	)
}
