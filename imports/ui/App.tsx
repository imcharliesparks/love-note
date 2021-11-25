import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthPage } from './components/AuthPage'
import ErrorBoundary from './components/ErrorBoundary'

export const App = () => (
	<ErrorBoundary>
		<Router>
			<Routes>
				<Route path="/" element={<AuthPage />} />
			</Routes>
		</Router>
	</ErrorBoundary>
)
