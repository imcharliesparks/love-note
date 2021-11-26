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

	return (
		<div>
			{user === null && !isLoggingIn ? (
				<div>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/log-in">
								Log In
							</Link>
						</nav>
					</button>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/sign-up">
								Sign Up
							</Link>
						</nav>
					</button>
				</div>
			) : (
				<div>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/create-note">
								Create Note
							</Link>
						</nav>
					</button>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/my-notes">
								My Notes
							</Link>
						</nav>
					</button>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/partner-notes">
								Partner Notes
							</Link>
						</nav>
					</button>
					<button type="button">
						<nav>
							<Link style={linkStyles} to="/add-partner">
								Add Partner
							</Link>
						</nav>
					</button>
					<button type="button" onClick={handleSignOut}>
						Sign Out
					</button>
				</div>
			)}
		</div>
	)
}
