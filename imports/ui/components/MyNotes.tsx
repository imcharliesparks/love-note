import { Button, List } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyNotes } from '../hooks/useMyNotes'
import { LoadingSpinner } from './LoadingSpinner'
import { Note } from './Note'
import { NoteType, TNote } from '/shared/constants'

export const MyNotes = (): React.ReactElement => {
	const [notes, isLoading]: [TNote[], boolean] = useMyNotes()
	const navigate = useNavigate()

	return isLoading ? (
		<LoadingSpinner>Loading notes...</LoadingSpinner>
	) : notes.length ? (
		<List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
			{notes.map((note: TNote) => (
				<Note
					content={note.content}
					createdAt={note.createdAt as string}
					key={note._id!}
					id={note._id!}
					noteType={NoteType.USER_NOTE}
				/>
			))}
		</List>
	) : (
		<div
			style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<h1 style={{ textAlign: 'center', marginTop: 36 }}>You don&apos;t have any notes!</h1>
			<Button
				onClick={() => navigate('../create-note')}
				variant="contained"
				style={{ margin: '0 auto' }}>
				Create a Note
			</Button>
		</div>
	)
}
