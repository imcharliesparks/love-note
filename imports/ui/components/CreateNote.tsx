import { Meteor } from 'meteor/meteor'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NotesMethods } from '/shared/constants'

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
		<form onSubmit={handleOnSubmit}>
			<input
				value={note}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
				type="text"
				placeholder="Enter your note here"
			/>
			<button type="submit">Add Note</button>
		</form>
	)
}
