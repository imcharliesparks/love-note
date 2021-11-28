import { List } from '@mui/material'
import React from 'react'
import { useMyNotes } from '../hooks/useMyNotes'
import { Note } from './Note'
import { TNote } from '/shared/constants'

export const MyNotes = (): React.ReactElement => {
	const [notes, isLoading]: [TNote[], boolean] = useMyNotes()

	if (isLoading) return <h1>notes loading</h1>

	return notes.length ? (
		<List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
			{notes.map((note: TNote) => (
				<Note content={note.content} createdAt={note.createdAt as string} key={note._id!} />
			))}
		</List>
	) : (
		<h1>You don&apos;t have any notes!</h1>
	)
}
