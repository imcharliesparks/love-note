import { Button, Typography } from '@mui/material'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TMeteorError } from '/shared/constants'

const linkStyles: React.CSSProperties = {
	textDecoration: 'none',
	color: 'black'
}

export const Home = (): React.ReactElement => {
	const navigate = useNavigate()
	const user = Meteor.user()
	const isLoggingIn = Meteor.loggingIn()

	const handleSignOut = () => {
		// TODO: Add error handling here
		// @ts-ignore
		Meteor.logout((e: TMeteorError) => {
			navigate('/')
		})
	}

	if (user) navigate('../my-notes')

	return (
		<div style={{ marginTop: 28, textAlign: 'center' }}>
			<div style={{ margin: '12px 0px' }}>
				<Typography variant="h5">Welcome to LoveNote!</Typography>
			</div>
			<div>
				<Typography style={{ marginBottom: 24 }}>
					Please log-in or sign-up to get started
				</Typography>
				<Button
					onClick={() => navigate('../log-in')}
					style={{ width: 100, margin: '0 5px' }}
					variant="contained">
					Log In
				</Button>
				<Button
					onClick={() => navigate('../sign-up')}
					style={{ width: 100, margin: '0 5px' }}
					variant="contained">
					Sign Up
				</Button>
			</div>
		</div>
	)
}
