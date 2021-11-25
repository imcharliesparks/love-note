import { Mongo } from 'meteor/mongo'
import { TaskItem } from '/shared/types'

export const TasksCollection = new Mongo.Collection<TaskItem>('tasks')
