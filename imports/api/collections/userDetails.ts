import { Mongo } from 'meteor/mongo'
import { MongoCollections, TUserDetails } from '/shared/constants'

export const UserDetailsCollection = new Mongo.Collection<TUserDetails>(
	MongoCollections.USER_DETAILS
)
