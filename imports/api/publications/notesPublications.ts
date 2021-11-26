import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { NotesPubsAndSubs } from '/shared/constants'

Meteor.publish(NotesPubsAndSubs.MY_NOTES, function publishMyNotes() {
	return NotesCollection.find({ userId: this.userId ?? '' })
})

Meteor.publish(NotesPubsAndSubs.PARTNER_NOTES, function publishPartnerNotes() {
	const user = Meteor.user()
	// @ts-ignore
	const partner = Meteor.users.findOne({ _id: user.userDetails.partnerId })
	if (partner) {
		if (
			// @ts-ignore
			partner.userDetails.partnerId === user?._id &&
			// @ts-ignore
			user.userDetails.partnerId === partner?._id
		) {
			// @ts-ignore
			return NotesCollection.find({ userId: user.userDetails.partnerId })
		}
	}
	return NotesCollection.find({ userId: 'fake id' })
})
