import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { UserDetailsCollection } from '../collections/userDetails'
import { TUserDetails, TUserInsert, UserMethods } from '/shared/constants'

// TODO: Add update and remove methods
Meteor.methods({
	[UserMethods.INSERT](user: TUserInsert) {
		check(user, Object)
		const { email, password, firstName, lastName } = user
		const userId: string = Accounts.createUser({
			email,
			password
		})

		const newUserDetails: TUserDetails = {
			userId,
			firstName,
			lastName,
			partnerId: null
		}
		UserDetailsCollection.insert(newUserDetails)
	},
	[UserMethods.ADD_PARTNER](partnerEmail: string) {
		check(partnerEmail, String)
		const foundUser = Meteor.users.findOne({ 'emails.address': partnerEmail })
		if (foundUser) {
			UserDetailsCollection.update(
				{ userId: this.userId! },
				{
					$set: {
						partnerId: foundUser?._id
					}
				}
			)
		} else {
			throw new Meteor.Error('400', 'No user with that email address was found.')
		}
	}
})
