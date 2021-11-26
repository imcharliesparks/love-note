import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { CreateNote } from './components/CreateNote'
import ErrorBoundary from './components/ErrorBoundary'
import { MyNotes } from './components/MyNotes'
import { PrivateRoute } from './components/PrivateRoute'

export const App = () => {
	const user = useTracker(() => Meteor.user())
	return (
		<ErrorBoundary>
			<Router>
				<Routes>
					<Route path="/" element={<h1>home</h1>} />
					<Route
						path="/my-notes"
						element={
							<PrivateRoute>
								<MyNotes />
							</PrivateRoute>
						}
					/>
					<Route path="/create-note" element={<CreateNote />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
				</Routes>
			</Router>
		</ErrorBoundary>
	)
}
