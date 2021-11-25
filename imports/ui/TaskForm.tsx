import React, { useState } from 'react'
import { TasksCollection } from '../api/tasks'

export const TaskForm = () => {
	const [text, setText] = useState('')
	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (text) {
			TasksCollection.insert({ text })
		}

		setText('')
	}

	return (
		<form onSubmit={onSubmit} className="task-form">
			<input
				value={text}
				onChange={(e: React.SyntheticEvent) => {
					setText(e.target.value)
				}}
				type="text"
				placeholder="Type to add new tasks"
			/>

			<button type="submit">Add Task</button>
		</form>
	)
}
