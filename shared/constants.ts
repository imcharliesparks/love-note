export type TUser = {
	_id?: string
	firstName: string
	lastName: string
	partner?: string
}

export type TNote = {
	_id?: string
	userId?: string
	content: string
	createdAt: string | Date
}

export enum MongoCollections {
	NOTES = 'notes'
}

export enum NotesMethods {
	INSERT = 'notes.insert',
	REMOVE = 'notes.remove',
	UPDATE = 'notes.update'
}

export enum UserMethods {
	INSERT = 'users.insert',
	REMOVE = 'users.remove',
	UPDATE = 'users.update'
}
