import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { CreateNote } from './components/CreateNote'
import ErrorBoundary from './components/ErrorBoundary'
import { MyNotes } from './components/MyNotes'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './components/Home'

export const App = () => (
	<ErrorBoundary>
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/my-notes"
					element={
						<PrivateRoute>
							<MyNotes />
						</PrivateRoute>
					}
				/>
				<Route
					path="/create-note"
					element={
						<PrivateRoute>
							<CreateNote />
						</PrivateRoute>
					}
				/>
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/log-in" element={<LogIn />} />
			</Routes>
		</Router>
	</ErrorBoundary>
)
