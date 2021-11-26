import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { UserDetailsCollection } from '../collections/userDetails'
import { NotesPubsAndSubs, TUserDetails } from '/shared/constants'

Meteor.publish(NotesPubsAndSubs.MY_NOTES, function publishMyNotes() {
	return NotesCollection.find({ userId: this.userId ?? '' })
})

Meteor.publish(NotesPubsAndSubs.PARTNER_NOTES, function publishPartnerNotes() {
	const userDetails: TUserDetails | undefined = UserDetailsCollection.findOne({
		userId: this.userId!
	})

	if (userDetails && userDetails.partnerId) {
		const partnerUserDetails: TUserDetails | undefined = UserDetailsCollection.findOne({
			userId: userDetails.partnerId
		})

		if (partnerUserDetails) {
			const isMatch: boolean =
				partnerUserDetails.partnerId === this.userId &&
				userDetails.partnerId === partnerUserDetails.userId
			return isMatch
				? NotesCollection.find({ userId: userDetails.partnerId })
				: NotesCollection.find({ userId: 'fake id' })
		}
		return NotesCollection.find({ userId: 'fake id' })
	}
	return NotesCollection.find({ userId: 'fake id' })
})
