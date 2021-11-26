import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { TUserInsert, UserMethods } from '/shared/constants'

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
	}
})
