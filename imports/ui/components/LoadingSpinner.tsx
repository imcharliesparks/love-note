import * as React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type LoadingSpinnerProps = React.PropsWithChildren<Record<string, unknown>>

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	children
}: LoadingSpinnerProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '16vh',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
			<Typography sx={{ marginBottom: '8px' }} variant="h5">
				{children}
			</Typography>
			<CircularProgress />
		</Box>
	)
}
