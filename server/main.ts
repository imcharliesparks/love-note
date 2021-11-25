import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '../imports/api/tasks'

function insertTask(task: string) {
	TasksCollection.insert({ text: task })
}

Meteor.startup(() => {
	// If the Links collection is empty, add some data.
	if (TasksCollection.find().count() === 0) {
		insertTask('cheese')
		insertTask('bread')
		insertTask('hi')
	}
})
