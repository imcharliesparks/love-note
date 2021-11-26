import { Meteor } from 'meteor/meteor'
import { UserDetailsCollection } from '../collections/userDetails'
import { TUserDetails, UserDetailsMethods } from '/shared/constants'

Meteor.methods({
	[UserDetailsMethods.CHECK_FOR_PARTNER]() {
		const userDetails: TUserDetails | undefined = UserDetailsCollection.findOne({
			userId: this.userId!
		})

		if (!userDetails?.partnerId) {
			throw new Meteor.Error('400', 'You have not added a partner yet!')
		}

		const partnerUserDetails: TUserDetails | undefined = UserDetailsCollection.findOne({
			userId: userDetails.partnerId
		})

		if (!partnerUserDetails) {
			throw new Meteor.Error('400', 'Your partner has not signed up yet!')
		}

		if (!partnerUserDetails.partnerId || partnerUserDetails.partnerId !== userDetails.userId) {
			throw new Meteor.Error('400', 'Your partner has not added you as a partner yet!')
		}

		return true
	}
})
