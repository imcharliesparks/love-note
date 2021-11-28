import { Box, Button, TextField, Typography } from '@mui/material'
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

const boxStyles = {
	...authInputContainerStyles,
	margin: '0 12px'
}

export const CreateNote = (): React.ReactElement => {
	const [note, setNote] = React.useState<string>('')
	const navigate = useNavigate()

	const handleOnSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
		e.preventDefault()
		Meteor.call(NotesMethods.INSERT, note, () => {
			navigate('/my-notes')
		})
	}

	return (
		<div style={authOuterDivStyles}>
			<div style={authInnerDivStyles}>
				<Box component="form" style={boxStyles} onSubmit={handleOnSubmit}>
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
					/>
					<Button type="submit" style={authButtonStyles} variant="contained">
						Submit
					</Button>
				</Box>
			</div>
		</div>
	)
}
