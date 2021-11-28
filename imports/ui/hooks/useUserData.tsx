import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { UserDetailsCollection } from '/imports/api/collections/userDetails'
import { TUserBasicUserData, UserDetailsPubsAndSubs } from '/shared/constants'

export const userUserData = (): TUserBasicUserData[] => {
	const userDetails = useTracker(() => {
		const handler = Meteor.subscribe(UserDetailsPubsAndSubs.MY_USER_DETAILS)
		if (!handler.ready()) return Object.create({})
		return UserDetailsCollection.findOne()
	})

	const partnerUserDetails = useTracker(() => {
		const handler = Meteor.subscribe(UserDetailsPubsAndSubs.PARTNER_USER_DETAILS)
		if (!handler.ready()) return Object.create({})
		return UserDetailsCollection.findOne()
	})

	return [userDetails, partnerUserDetails]
}
