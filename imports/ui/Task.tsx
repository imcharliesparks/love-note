import React from 'react'
import { TaskItem } from '/shared/types'

export const Task = ({ task }: { task: TaskItem }): React.ReactElement => <li>{task.text}</li>
