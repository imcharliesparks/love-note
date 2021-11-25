import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { NotesMethods, TNote } from '/shared/constants'

Meteor.methods({
	[NotesMethods.INSERT](content: string) {
		check(content, String)
		const newNote: TNote = {
			content,
			createdAt: Date()
		}
		console.log('newNote', newNote)
		NotesCollection.insert(newNote)
	},
	[NotesMethods.REMOVE](id: string) {
		check(id, String)
		NotesCollection.remove({ _id: id })
	},
	[NotesMethods.UPDATE](id: string, newContent: string) {
		check(id, String)
		check(newContent, String)
		const foundNote: TNote | undefined = NotesCollection.findOne(id)
		console.log('foundNote', foundNote)
		if (!foundNote) {
			throw new Meteor.Error('No note with that ID was found')
		}
	}
})
