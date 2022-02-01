import { List } from '@mui/material'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { usePartnerNotes } from '../hooks/usePartnerNotes'
import { LoadingSpinner } from './LoadingSpinner'
import { Note } from './Note'
import { NoteType, TMeteorError, TNote, UserDetailsMethods } from '/shared/constants'

export const PartnerNotes = (): React.ReactElement => {
	const [error, setError] = React.useState<string>('')
	const [notes, isLoading]: [TNote[], boolean] = usePartnerNotes()
	Meteor.call(UserDetailsMethods.CHECK_FOR_PARTNER, (e: TMeteorError) => {
		if (e) {
			const error = e as Meteor.Error
			setError(error.reason ?? 'There was an error finding your partner')
		} else {
			setError('')
		}
	})

	if (isLoading) return <LoadingSpinner>Notes loading...</LoadingSpinner>
	// TODO: Add better error screen
	if (error) return <h1>{error}</h1>

	return notes.length ? (
		<List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
			{notes.map((note: TNote) => (
				<Note
					content={note.content}
					createdAt={note.createdAt as string}
					key={note._id!}
					id={note._id!}
					noteType={NoteType.PARTNER_NOTE}
				/>
			))}
		</List>
	) : (
		// Todo: clean this up
		<h1>Your partner doesn&apos;t have any notes!</h1>
	)
}
