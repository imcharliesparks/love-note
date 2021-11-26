import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { UserMethods } from '/shared/constants'

Meteor.methods({
	// TODO: Add type here
	[UserMethods.INSERT](user: any) {
		check(user, Object)
		const result = Accounts.createUser({
			email: user.email,
			password: user.password
		})

		console.log('result', result)
		return result
	}
})
