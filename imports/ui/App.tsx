import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { TasksCollection } from '../api/tasks'
import { Task } from './Task'
import { TaskForm } from './TaskForm'
import { TaskItem } from '/shared/types'

export const App = () => {
	const tasks: TaskItem[] = useTracker(() => TasksCollection.find().fetch())

	return (
		<div>
			<ul>
				{tasks.map((task: TaskItem) => (
					<Task task={task} key={task._id} />
				))}
			</ul>
			<br />
			<TaskForm />
		</div>
	)
}
