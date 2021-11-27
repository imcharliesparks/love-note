import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { UserDetailsCollection } from '/imports/api/collections/userDetails'
import { UserDetailsPubsAndSubs } from '/shared/constants'

export const userUserData = () => {
	const userDetails = useTracker(() => {
		const handler = Meteor.subscribe(UserDetailsPubsAndSubs.MY_USER_DETAILS)
		if (!handler.ready()) return {}
		return UserDetailsCollection.findOne()
	})

	const partnerUserDetails = useTracker(() => {
		const handler = Meteor.subscribe(UserDetailsPubsAndSubs.PARTNER_USER_DETAILS)
		if (!handler.ready()) return {}
		return UserDetailsCollection.findOne()
	})

	return [userDetails, partnerUserDetails]
}
