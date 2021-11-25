import { Mongo } from 'meteor/mongo'
import { MongoCollections, TNote } from '/shared/constants'

export const NotesCollection = new Mongo.Collection<TNote>(MongoCollections.NOTES)
