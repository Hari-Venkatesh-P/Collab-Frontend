import React , {useEffect, useState} from 'react';
import { useHistory } from "react-router";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentLateTwoToneIcon from '@material-ui/icons/AssignmentLateTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import { isMemberLoggedIn } from '../Auth/authutils';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector,useDispatch} from "react-redux" 
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {TEAM_ADDED_SUBSCRIPTION} from  "../graphql/teams/teamsubscription"
import {useSubscription } from "@apollo/client"
import {CREATE_NOTICATION} from "../redux/actions/notificationActions"

 const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar(props) {
  const [notifications,setNotifications] = useState([])
  const dispatch = useDispatch()
  const history = useHistory();

  const { data, loading, error } = useSubscription(TEAM_ADDED_SUBSCRIPTION);

  useEffect(()=>{
    if(data){
      setNotifications(notifications => [...notifications, data.teamAdded])
    }
  })
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        notifications.map((noti)=>{
          return(
            <MenuItem >
            <p>{noti}</p>
            </MenuItem>
          )
        })
      }
    </Menu>
  );
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
            <ListItem button key={"Projects"} onClick={()=>{history.replace("/projects")}}>
                <ListItemIcon><AssignmentLateTwoToneIcon /> </ListItemIcon>
                <ListItemText primary={"PROJECTS"} />
            </ListItem>
            <Divider />
            <ListItem button key={"Teams"} onClick={()=>{window.location.href ="/teams"}}>
                <ListItemIcon><PeopleTwoToneIcon /></ListItemIcon>
                <ListItemText primary={"TEAMS"} />
            </ListItem>
            <Divider />
            <ListItem button key={"Members"} onClick={()=>{window.location.href ="/members"}}>
                <ListItemIcon><PermIdentityTwoToneIcon /></ListItemIcon>
                <ListItemText primary={isMemberLoggedIn() ? "COLLEAGUES" : "MEMBERS"} />
            </ListItem>
            <Divider />
      </List>
    </div>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
                <React.Fragment key={'left'}>
                    <IconButton edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer" onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list('left')}
                        </Drawer>
                </React.Fragment>
          
          <Typography className={classes.title} variant="h6" noWrap>
          Collabs
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={handleMobileMenuOpen}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> 
            {
              isMemberLoggedIn() &&
              <React.Fragment>
                  <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=>{history.replace("/profile")}}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
              </React.Fragment>
            }
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}