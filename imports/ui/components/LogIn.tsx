import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { useNavigate } from 'react-router'
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
		<form onSubmit={handleLogIn}>
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
