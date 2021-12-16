import { Box, Button, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Meteor } from 'meteor/meteor'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	authButtonStyles,
	authInnerDivStyles,
	authInputContainerStyles,
	authOuterDivStyles
} from './styles'
import { NotesMethods } from '/shared/constants'

const useStyles = makeStyles({
	box: {
		...authInputContainerStyles,
		margin: '0 12px'
	},
	textField: {
		'& > .MuiFormHelperText-root': {
			textAlign: 'center',
			marginTop: 20
		}
	}
})

export const CreateNote = (): React.ReactElement => {
	const [note, setNote] = React.useState<string>('')
	const [error, setError] = React.useState<string>('')
	const classes = useStyles()
	const navigate = useNavigate()

	const handleOnSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
		e.preventDefault()
		Meteor.call(NotesMethods.INSERT, note, (e: Meteor.Error) => {
			if (e) {
				setError(e.reason ?? 'There was an error creating your note.')
			} else {
				setError('')
				navigate('/my-notes')
			}
		})
	}

	return (
		<div style={authOuterDivStyles}>
			<div style={authInnerDivStyles}>
				<Box component="form" className={classes.box} onSubmit={handleOnSubmit}>
					<Typography
						style={{ textAlign: 'center', marginTop: '.35em' }}
						variant="h5"
						gutterBottom
						component="div">
						Create Note
					</Typography>
					<TextField
						multiline
						rows={4}
						value={note}
						placeholder="Enter your note"
						error={!!error}
						helperText={error}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
						className={classes.textField}
					/>
					<Button type="submit" style={authButtonStyles} variant="contained">
						Submit
					</Button>
				</Box>
			</div>
		</div>
	)
}
