import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { NotesPubsAndSubs } from '/shared/constants'

Meteor.publish(NotesPubsAndSubs.MY_NOTES, function publishNotes() {
	return NotesCollection.find({ userId: this.userId! })
})

Meteor.publish(NotesPubsAndSubs.PARTNER_NOTES, function publishNotes() {
	// @ts-ignore
	const { userDetails } = Meteor.user()
	console.log('user', userDetails)
	return NotesCollection.find({ userId: userDetails.partnerId })
})
