import * as React from 'react'
import { Meteor } from 'meteor/meteor'
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { useNavigate } from 'react-router-dom'

type SideDrawerProps = {
	isOpen: boolean
	toggleDrawer: (drawerState: boolean) => void
	isLoggedIn: boolean
}

export const SideDrawer = ({
	isOpen,
	toggleDrawer,
	isLoggedIn
}: SideDrawerProps): React.ReactElement => {
	const navigate = useNavigate()

	return (
		<SwipeableDrawer
			anchor="left"
			open={isOpen}
			onClose={() => toggleDrawer(false)}
			onOpen={() => toggleDrawer(true)}>
			<Box
				sx={{ width: 250 }}
				role="presentation"
				onClick={() => toggleDrawer(false)}
				onKeyDown={() => toggleDrawer(false)}
				component="div">
				{isLoggedIn ? (
					<>
						<List>
							<ListItem button>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="My Notes" />
							</ListItem>
						</List>
						<List>
							<ListItem button>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="My Partner's Notes" />
							</ListItem>
						</List>
						<List>
							<ListItem button>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="Create Note" />
							</ListItem>
						</List>
						<Divider />
					</>
				) : (
					<>
						<List>
							<ListItem onClick={() => navigate('../log-in')} button>
								<ListItemIcon>
									<LoginIcon />
								</ListItemIcon>
								<ListItemText primary="Log In" />
							</ListItem>
						</List>
						<List>
							<ListItem onClick={() => navigate('../sign-up')} button>
								<ListItemIcon>
									<GroupAddIcon />
								</ListItemIcon>
								<ListItemText primary="Sign Up" />
							</ListItem>
						</List>
					</>
				)}
			</Box>
		</SwipeableDrawer>
	)
}
