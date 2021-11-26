import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { UserMethods } from '/shared/constants'

export const AddPartner = (): React.ReactElement => {
	const [email, setEmail] = React.useState<string>('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		Meteor.call(UserMethods.ADD_PARTNER, email)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={email}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				type="email"
				placeholder="Enter your partner's email address"
			/>
			<button type="submit">Add Partner</button>
		</form>
	)
}
