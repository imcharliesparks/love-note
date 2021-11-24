import React from 'react'
import { Task, TaskItem } from './Task'

const tasks: TaskItem[] = [
	{ _id: 1, text: 'First Task' },
	{ _id: 2, text: 'Second Task' },
	{ _id: 3, text: 'Third Task' }
]

export const App = () => (
	<div>
		<ul>
			{tasks.map((task: TaskItem) => (
				<Task task={task} key={task._id} />
			))}
		</ul>
	</div>
)
