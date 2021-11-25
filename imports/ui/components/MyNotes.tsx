import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { NotesCollection } from '/imports/api/collections/notes'
import { TNote } from '/shared/constants'

export const MyNotes = (): React.ReactElement => {
	const notes = useTracker(() => NotesCollection.find().fetch())

	return notes.length ? (
		<ul>
			{notes.map((note: TNote) => (
				<li key={note._id}>{note.content}</li>
			))}
		</ul>
	) : (
		<h1>You don&apos;t have any notes!</h1>
	)
}
