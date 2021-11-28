import * as React from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { formatDate } from '/shared/utils'

export type NoteProps = {
	key: string
	content: string
	createdAt: string
}

export const Note = ({ content, createdAt }: NoteProps): React.ReactElement => (
	<Card sx={{ maxWidth: 345, margin: '20px auto 0 auto' }}>
		<CardActionArea>
			{/* TODO: Add ability to add images here */}
			{/* <CardMedia
				component="img"
				height="140"
				image="/static/images/cards/contemplative-reptile.jpg"
				alt="green iguana"
			/> */}
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
		{/* <CardActions>
			<Button size="small" color="primary">
				Edit
			</Button>
		</CardActions> */}
	</Card>
)
