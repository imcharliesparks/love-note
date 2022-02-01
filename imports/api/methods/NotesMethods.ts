import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { NotesMethods, TMeteorError, TNote } from '/shared/constants'

Meteor.methods({
	[NotesMethods.INSERT](content: string) {
		check(content, String)
		const newNote: TNote = {
			content,
			createdAt: new Date().toISOString(),
			userId: this.userId!
		}
		NotesCollection.insert(newNote)
	},
	[NotesMethods.REMOVE](id: string) {
		check(id, String)
		NotesCollection.remove({ _id: id })
	},
	async [NotesMethods.UPDATE](id: string, newContent: string) {
		check(id, String)
		check(newContent, String)
		NotesCollection.update(
			id,
			{ $set: { content: newContent } },
			{ multi: false },
			(err: TMeteorError) => {
				if (err) throw new Meteor.Error(err.message)
			}
		)
	}
})
