import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { UserMethods } from '/shared/constants'

Meteor.methods({
	// TODO: Add type here
	[UserMethods.INSERT](user: any) {
		check(user, Object)
		const newUserId: string = Accounts.createUser({
			email: user.email,
			password: user.password
		})

		Meteor.users.update(newUserId, {
			// TODO: Type this as well
			$set: {
				userDetails: {
					firstName: user.firstName,
					lastName: user.lastName,
					partnerId: null
				}
			}
		})
	}
})
