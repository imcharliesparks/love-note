import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { TUserInsert, UserMethods } from '/shared/constants'

// TODO: Add update and remove methods
Meteor.methods({
	[UserMethods.INSERT](user: TUserInsert) {
		check(user, Object)
		const newUserId: string = Accounts.createUser({
			email: user.email,
			password: user.password
		})

		Meteor.users.update(newUserId, {
			$set: {
				userDetails: {
					firstName: user.firstName,
					lastName: user.lastName,
					partnerId: null
				}
			}
		})
	},
	[UserMethods.ADD_PARTNER](partnerEmail: string) {
		check(partnerEmail, String)
		const foundUser = Meteor.users.findOne({ 'emails.address': partnerEmail })
		if (foundUser) {
			const currentUser = Meteor.user()
			Meteor.users.update(this.userId!, {
				$set: {
					userDetails: {
						// @ts-ignore
						...currentUser.userDetails,
						partnerId: foundUser._id
					}
				}
			})
		}
	}
})
