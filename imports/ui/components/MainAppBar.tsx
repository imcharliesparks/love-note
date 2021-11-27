import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useLocation, Location } from 'react-router-dom'

type MainAppBarProps = {
	toggleDrawer: (drawerState: boolean) => void
	isLoggedIn: boolean
}

export const MainAppBar = ({ toggleDrawer, isLoggedIn }: MainAppBarProps): React.ReactElement => {
	const location: Location = useLocation()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						onClick={() => toggleDrawer(true)}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					{/* TODO: Convert to react router link */}
					<Link
						style={{ color: 'white' }}
						href="/"
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}>
						LoveNote
					</Link>
					{isLoggedIn ? (
						<AccountCircleIcon />
					) : (
						<Button href="/log-in" color="inherit">
							{location.pathname.includes('log-in') ? 'Sign Up' : 'Log In'}
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
