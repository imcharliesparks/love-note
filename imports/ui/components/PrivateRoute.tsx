import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: React.ReactElement
}

export const PrivateRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate()
	const user = Meteor.user()
	const isLoggingIn = Meteor.loggingIn()

	if (user === null && !isLoggingIn) {
		navigate('../')
	}

	return children
}
