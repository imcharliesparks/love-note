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
import LogoutIcon from '@mui/icons-material/Logout'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import PersonIcon from '@mui/icons-material/Person'
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
				<List>
					<ListItem onClick={() => navigate('../')} button>
						<ListItemText primary="Welcome" />
					</ListItem>
				</List>
				<Divider />
				{isLoggedIn ? (
					<>
						<List>
							<ListItem onClick={() => navigate('../my-notes')} button>
								<ListItemIcon>
									<StickyNote2Icon />
								</ListItemIcon>
								<ListItemText primary="My Notes" />
							</ListItem>
						</List>
						<List>
							<ListItem onClick={() => navigate('../partner-notes')} button>
								<ListItemIcon>
									{/* TODO: Find a better icon for this */}
									<PersonIcon />
								</ListItemIcon>
								<ListItemText primary="My Partner's Notes" />
							</ListItem>
						</List>
						<List>
							<ListItem onClick={() => navigate('../create-note')} button>
								<ListItemIcon>
									<NoteAddIcon />
								</ListItemIcon>
								<ListItemText primary="Create Note" />
							</ListItem>
						</List>
						<Divider />
						<List>
							<ListItem onClick={() => Meteor.logout()} button>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Sign Out" />
							</ListItem>
						</List>
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
