import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import React from 'react'
import { UserMethods } from '/shared/constants'
import { useNavigate } from 'react-router'

export const AuthPage = (): React.ReactElement => {
	// TODO: Add redirect
	// TODO: Add email and password validation
	const navigate = useNavigate()
	const [firstName, setFirstName] = React.useState<string>('')
	const [lastName, setLastName] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')

	const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO: Make this better
		if (!firstName || !lastName || !email || !password) return setError('please enter all details')
		setError('')

		Meteor.call(
			UserMethods.INSERT,
			{ firstName, lastName, email, password },
			// TODO: Type meteor error
			(e: any) => {
				if (e) setError(e.reason)
				// TODO: redirect to my notes
				else navigate('../create-note')
			}
		)
	}

	// TODO: Do something better here
	if (Meteor.user()) return <h1>You are already registered!</h1>

	return (
		<form onSubmit={handleCreateUser}>
			<input
				value={firstName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
				type="text"
				placeholder="enter your first name"
			/>
			<input
				value={lastName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
				type="text"
				placeholder="enter your last name"
			/>
			<input
				value={email}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				type="email"
				placeholder="enter your email"
			/>
			<input
				value={password}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				type="password"
				placeholder="enter your password"
			/>
			<button type="submit">Submit</button>
			{error && <p>{error}</p>}
		</form>
	)
}
