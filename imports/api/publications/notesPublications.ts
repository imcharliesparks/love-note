import { Meteor } from 'meteor/meteor'
import { NotesCollection } from '../collections/notes'
import { MongoCollections } from '/shared/constants'

Meteor.publish(MongoCollections.NOTES, function publishNotes() {
	// TODO: Show notes for user and partner
	const foundNotes = NotesCollection.find({ userId: this.userId! })
	return foundNotes
})
