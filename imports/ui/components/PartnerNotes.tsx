import { List } from '@mui/material'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { usePartnerNotes } from '../hooks/usePartnerNotes'
import { Note } from './Note'
import { NotesCollection } from '/imports/api/collections/notes'
import {
	NotesPubsAndSubs,
	NotesSubscriptionReturn,
	TMeteorError,
	TNote,
	UserDetailsMethods
} from '/shared/constants'

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

	if (isLoading) return <h1>notes loading</h1>
	if (error) return <h1>{error}</h1>

	return notes.length ? (
		<List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
			{notes.map((note: TNote) => (
				<Note content={note.content} createdAt={note.createdAt as string} key={note._id!} />
			))}
		</List>
	) : (
		<h1>Your partner doesn&apos;t have any notes!</h1>
	)
}
