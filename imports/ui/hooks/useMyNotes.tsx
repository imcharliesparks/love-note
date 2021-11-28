import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { NotesCollection } from '/imports/api/collections/notes'
import { NotesPubsAndSubs, TNote } from '/shared/constants'

export const useMyNotes = (): [TNote[], boolean] => {
	const { myNotes, isLoading } = useTracker(() => {
		const handler = Meteor.subscribe(NotesPubsAndSubs.MY_NOTES)
		if (!handler.ready()) return { myNotes: [], isLoading: true }
		const notes: TNote[] = NotesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
		return { myNotes: notes, isLoading: false }
	})

	// TODO: Add sorting by week
	return [myNotes, isLoading]
}
