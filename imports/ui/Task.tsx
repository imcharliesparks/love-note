import React from 'react'

export type TaskItem = {
	_id: number
	text: string
}

export const Task = ({ task }: { task: TaskItem }): React.ReactElement => <li>{task.text}</li>
