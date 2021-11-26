import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { NotesCollection } from '/imports/api/collections/notes'
import { MongoCollections, TNote } from '/shared/constants'

type NotesSubscriptionReturn = {
	notes: TNote[] | []
	isLoading: boolean
}

export const MyNotes = (): React.ReactElement => {
	const { notes, isLoading }: NotesSubscriptionReturn = useTracker((): NotesSubscriptionReturn => {
		const resultObj = { notes: [], isLoading: true }

		const handler = Meteor.subscribe(MongoCollections.NOTES)
		if (!handler.ready()) return { ...resultObj, isLoading: true }

		const notes: TNote[] = NotesCollection.find({}, { sort: { createdAt: 1 } }).fetch()
		return { notes, isLoading: false }
	})

	if (isLoading) return <h1>notes loading</h1>

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
