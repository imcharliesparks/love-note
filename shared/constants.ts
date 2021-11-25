export type LBUser = {
	_id?: string
	firstName: string
	lastName: string
	partner?: string
}

export type Note = {
	_id?: string
	content: string
	createdAt: string | Date
}
