import { Meteor } from 'meteor/meteor'
import { UserDetailsCollection } from '../collections/userDetails'
import { UserDetailsPubsAndSubs } from '/shared/constants'

Meteor.publish(UserDetailsPubsAndSubs.MY_USER_DETAILS, function publishMyUserDetails() {
	return UserDetailsCollection.find({ userId: this.userId ?? '' })
})
Meteor.publish(UserDetailsPubsAndSubs.PARTNER_USER_DETAILS, function publishPartnerUserDetails() {
	return UserDetailsCollection.find({
		partnerId: this.userId ?? ''
	})
})
