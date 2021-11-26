import { Meteor } from 'meteor/meteor'

export type TUserInsert = {
	_id?: string
	email: string
	password?: string
	firstName: string
	lastName: string
	partnerId?: string
}

export type TUserDetails = {
	userId: string
	firstName: string
	lastName: string
	partnerId?: string | null
}

export type TNote = {
	_id?: string
	userId?: string
	content: string
	createdAt: string | Date
}

export type TMeteorError = Meteor.Error | Error | TypeError | undefined

export type NotesSubscriptionReturn = {
	notes: TNote[] | []
	isLoading: boolean
}

export enum MongoCollections {
	NOTES = 'notes',
	USER_DETAILS = 'user_details'
}

export enum NotesMethods {
	INSERT = 'notes.insert',
	REMOVE = 'notes.remove',
	UPDATE = 'notes.update'
}

export enum UserMethods {
	INSERT = 'users.insert',
	REMOVE = 'users.remove',
	UPDATE = 'users.update',
	ADD_PARTNER = 'add.partner'
}

export enum NotesPubsAndSubs {
	MY_NOTES = 'my_notes',
	PARTNER_NOTES = 'partner_notes'
}

export enum UserDetailsMethods {
	CHECK_FOR_PARTNER = 'check_for_parter'
}
