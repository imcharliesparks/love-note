import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthPage } from './components/AuthPage'
import { CreateNote } from './components/CreateNote'
import ErrorBoundary from './components/ErrorBoundary'
import { MyNotes } from './components/MyNotes'

export const App = () => (
	<ErrorBoundary>
		<Router>
			<Routes>
				<Route path="/my-notes" element={<MyNotes />} />
				<Route path="/create-note" element={<CreateNote />} />
				<Route path="/auth" element={<AuthPage />} />
			</Routes>
		</Router>
	</ErrorBoundary>
)
