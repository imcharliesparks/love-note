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
	const { user, isLoaded } = useTracker(() => ({
		user: Meteor.user(),
		isLoaded: Meteor.loggingIn()
	}))

	if (isLoaded) return <h1>loading...</h1>

	return user ? children : navigate('../')
}
