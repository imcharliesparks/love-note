import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { NotesCollection } from '/imports/api/collections/notes'
import { NotesPubsAndSubs, NotesSubscriptionReturn, TNote } from '/shared/constants'

// TODO: Fix so it doesn't show that your partner doesn't have notes if you're not set up with a partner
export const PartnerNotes = (): React.ReactElement => {
	const { notes, isLoading }: NotesSubscriptionReturn = useTracker((): NotesSubscriptionReturn => {
		const resultObj = { notes: [], isLoading: true }

		const handler = Meteor.subscribe(NotesPubsAndSubs.PARTNER_NOTES)
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
		<h1>Your partner doesn&apos;t have any notes!</h1>
	)
}
