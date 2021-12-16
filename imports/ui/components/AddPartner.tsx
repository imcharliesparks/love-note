import { Box, Typography, TextField, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import {
	authOuterDivStyles,
	authInnerDivStyles,
	authButtonStyles,
	authInputContainerStyles
} from './styles'
import { TMeteorError, UserMethods } from '/shared/constants'

const useStyles = makeStyles({
	box: {
		...authInputContainerStyles,
		margin: '0 12px',
		marginTop: 4
	},
	textField: {
		'& > .MuiFormHelperText-root': {
			textAlign: 'center',
			marginTop: 20
		}
	}
})

export const AddPartner = (): React.ReactElement => {
	const [email, setEmail] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const classes = useStyles()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		Meteor.call(UserMethods.ADD_PARTNER, email, (e: TMeteorError) => {
			const error = e as Meteor.Error
			if (error) setError(error.reason ?? 'There was an error adding your partner')
		})
	}

	return (
		<div style={authOuterDivStyles}>
			<div style={authInnerDivStyles}>
				<Box component="form" className={classes.box} onSubmit={handleSubmit}>
					<Typography
						style={{ textAlign: 'center', marginTop: '.35em' }}
						variant="h5"
						gutterBottom
						component="div">
						Add Partner
					</Typography>
					<TextField
						value={email}
						placeholder="Enter your partner's email"
						error={!!error}
						helperText={error}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
						className={classes.textField}
						type="email"
					/>
					<Button type="submit" style={authButtonStyles} variant="contained">
						Submit
					</Button>
				</Box>
			</div>
		</div>
	)
}
