import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: React.ReactElement
}

export const PrivateRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate()
	const user = useTracker(() => Meteor.user())
	const isLoggingIn = useTracker(() => Meteor.loggingIn())

	if (user === null && !isLoggingIn) {
		navigate('../')
	}

	return children
}
