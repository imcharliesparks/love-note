import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { SignUp } from './components/SignUp'
import { LogIn } from './components/LogIn'
import { CreateNote } from './components/CreateNote'
import ErrorBoundary from './components/ErrorBoundary'
import { MyNotes } from './components/MyNotes'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './components/Home'
import { AddPartner } from './components/AddPartner'
import { PartnerNotes } from './components/PartnerNotes'
import { MainAppBar } from './components/MainAppBar'
import { SideDrawer } from './components/SideDrawer'

export const App = () => {
	const user = Meteor.user()
	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false)
	const toggleDrawer = (drawerState: boolean) => setIsDrawerOpen(drawerState)

	return (
		<ErrorBoundary>
			<Router>
				<MainAppBar isLoggedIn={user !== null} toggleDrawer={toggleDrawer} />
				<SideDrawer isLoggedIn={user !== null} isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
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
						path="/partner-notes"
						element={
							<PrivateRoute>
								<PartnerNotes />
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
					<Route
						path="/add-partner"
						element={
							<PrivateRoute>
								<AddPartner />
							</PrivateRoute>
						}
					/>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<LogIn />} />
				</Routes>
			</Router>
		</ErrorBoundary>
	)
}
