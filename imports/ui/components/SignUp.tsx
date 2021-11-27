import { Meteor } from 'meteor/meteor'
import React from 'react'
import { TMeteorError, UserMethods } from '/shared/constants'
import { useNavigate, Link } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import { Typography, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material'
import {
	authOuterDivStyles,
	authInnerDivStyles,
	authInputContainerStyles,
	authInputStyles,
	authButtonStyles
} from './styles'

export const SignUp = (): React.ReactElement => {
	// TODO: Add email and password validation
	const navigate = useNavigate()
	const [firstName, setFirstName] = React.useState<string>('')
	const [lastName, setLastName] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const user = useTracker(() => Meteor.user())

	React.useEffect(() => {
		// TODO: Make this more seamless
		if (user) navigate('../create-note')
	}, [user])

	const handleCreateUser = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		// TODO: Make this better
		if (!firstName || !lastName || !email || !password) return setError('please enter all details')
		setError('')

		// TODO: Add loadding spinner for all of this
		Meteor.call(UserMethods.INSERT, { firstName, lastName, email, password }, (e: TMeteorError) => {
			const error = e as Meteor.Error
			if (e) setError(error.reason ?? 'There was an unknown error')
			else {
				Meteor.loginWithPassword({ email }, password, (e: TMeteorError) => {
					const error = e as Meteor.Error
					if (e) setError(error.reason ?? 'There was an unknown error')
					else navigate('../my-notes')
				})
			}
		})
	}

	// TODO: Do something better here
	if (Meteor.user()) return <h1>You are already registered!</h1>

	return (
		// <form onSubmit={handleCreateUser}>
		// 	<input
		// 		value={firstName}
		// 		onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
		// 		type="text"
		// 		placeholder="enter your first name"
		// 	/>
		// 	<input
		// 		value={lastName}
		// 		onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
		// 		type="text"
		// 		placeholder="enter your last name"
		// 	/>
		// 	<input
		// 		value={email}
		// 		onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
		// 		type="email"
		// 		placeholder="enter your email"
		// 	/>
		// 	<input
		// 		value={password}
		// 		onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
		// 		type="password"
		// 		placeholder="enter your password"
		// 	/>
		// 	<button type="submit">Submit</button>
		// 	{error && <p>{error}</p>}
		// </form>
		<div style={authOuterDivStyles}>
			<div style={authInnerDivStyles}>
				<form onSubmit={handleCreateUser} style={authInputContainerStyles}>
					<Typography style={{ textAlign: 'center' }} variant="h5" gutterBottom component="div">
						Log In
					</Typography>
					<FormControl style={authInputStyles}>
						<InputLabel htmlFor="component-outlined">First Name</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={firstName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
							label="first-name"
						/>
					</FormControl>
					<FormControl style={authInputStyles}>
						<InputLabel htmlFor="component-outlined">Last Name</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={lastName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
							label="last-name"
						/>
					</FormControl>
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
						Sign Up
					</Button>
					{/* TODO: Make specific errors here and consume properly in inputs */}
					{error && <Typography style={{ textAlign: 'center', color: 'red' }}>{error}</Typography>}
				</form>
			</div>
			<div style={{ width: 300, margin: '40px auto' }}>
				<Link style={{ textDecoration: 'none' }} to="/log-in">
					Already have an account? Log in instead.
				</Link>
			</div>
		</div>
	)
}
