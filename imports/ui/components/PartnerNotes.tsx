import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
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
	Meteor.call(UserDetailsMethods.CHECK_FOR_PARTNER, (e: TMeteorError) => {
		if (e) {
			const error = e as Meteor.Error
			setError(error.reason ?? 'There was an error finding your partner')
		} else {
			setError('')
		}
	})

	const { notes, isLoading }: NotesSubscriptionReturn = useTracker((): NotesSubscriptionReturn => {
		const resultObj = { notes: [], isLoading: true }

		const handler = Meteor.subscribe(NotesPubsAndSubs.PARTNER_NOTES)
		if (!handler.ready()) return { ...resultObj, isLoading: true }

		const notes: TNote[] = NotesCollection.find({}, { sort: { createdAt: 1 } }).fetch()
		return { notes, isLoading: false }
	})

	if (isLoading) return <h1>notes loading</h1>
	if (error) return <h1>{error}</h1>

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
