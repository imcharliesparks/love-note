import * as React from 'react'
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography
} from '@mui/material'
import { formatDate } from '/shared/utils'
import { NoteType } from '/shared/constants'
import { useNavigate } from 'react-router-dom'

export type NoteProps = {
	key: string
	content: string
	createdAt: string
	noteType: NoteType
	id: string
}

export const Note = ({ content, createdAt, noteType, id }: NoteProps): React.ReactElement => {
	const navigate = useNavigate()

	return (
		<Card sx={{ maxWidth: 345, margin: '20px auto 0 auto' }}>
			<CardActionArea>
				{/* TODO: Add ability to add images here */}
				<CardMedia
					component="img"
					height="140"
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQOVwsdHKyxUd7fSyepOSJ2QTArqaZkqgX7w&usqp=CAU"
					alt="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{formatDate(createdAt)}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{content}
					</Typography>
				</CardContent>
			</CardActionArea>
			{/* TODO: Add edit button */}
			{noteType === NoteType.USER_NOTE && (
				<CardActions>
					<Button
						onClick={() => navigate('../edit-note', { state: { currentNote: content, id } })}
						size="small"
						color="primary">
						Edit
					</Button>
				</CardActions>
			)}
		</Card>
	)
}
