import React from 'react'

export interface ErrorBoundaryProps {
	children: React.ReactElement
}

export interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidMount() {
		this.setState({ hasError: false })
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.log(error, errorInfo)
		this.setState({ hasError: true })
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong 🚣‍♀️</h1>
		}

		return this.props.children
	}
}

export default ErrorBoundary
