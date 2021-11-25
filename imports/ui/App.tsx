import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthPage } from './components/AuthPage'
import { CreateNote } from './components/CreateNote'
import ErrorBoundary from './components/ErrorBoundary'

export const App = () => (
	<ErrorBoundary>
		<Router>
			<Routes>
				<Route path="/" element={<CreateNote />} />
				<Route path="/auth" element={<AuthPage />} />
			</Routes>
		</Router>
	</ErrorBoundary>
)
