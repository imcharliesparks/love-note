import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	[k: string]: unknown
	children: React.ReactElement
}

export const PrivateRoute = ({ children, ...rest }: ProtectedRouteProps) => {
	const navigate = useNavigate()
	const { user, isLoggingIn } = useTracker(() => ({
		user: Meteor.user(),
		isLoggingIn: Meteor.loggingIn()
	}))

	if (!user && !isLoggingIn) {
		navigate('../')
	}

	return children
}
