import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios'
import api from '../uri';
import CardContent from '@mui/material/CardContent';

import Tooltip from '@mui/material/Tooltip';
const useStyles = makeStyles({
    root: {
      padding: ".5rem 2rem",
      borderBottom: "1px solid black",
      position: "relative",
    },
    input: {
        padding: 0,
        "& input" : {
            padding: "0.5rem",
        }
    },
    paper: {
        flexGrow: 1
    },
    tab: {
        fontSize: 12,
        color: "#5f6368",
        textTransform: "capitalize",
        height: 10,
        fontWeight: "600",
        fontFamily: "Google sans,Roboto,Arial,sans-serif"
    },
    tabs: {
        height: 10
    },
    notifi: {
        position: "relative",
    },
    notifiNest: {
        position: "absolute",
        background: "#fff",
        padding: "1rem 0",
        width: "320px",
        left: "-190px",
        top: "40px",
        zIndex: "2",
        boxShadow: "0 12px 28px 0 rgba(0,0,0,.2),0 2px 4px 0 rgba(0,0,0,.1),inset 0 0 0 1px rgba(255,255,255,.5)"
    }
  });

const style = {
    width: '100%',
    maxWidth: 260,
    bgcolor: 'background.paper',
    top: "100%",
    right: "0",
    position: "absolute",
    zIndex: "999",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
};

export default function Header({className , onAddClassHandle, onManageProfile, 
    classId , clsName}){
    const classes = useStyles();
    const [isOpen , setIsOpen] = useState(false);
    const [notifications , setNotifications] = useState([]);
    const [openNof , setOpenNof] = useState(false);

    let flag= false;

    if(className){
        flag= true;
        clsName= className;
    }

    useEffect(() => {
        axios.get(api +  'notififcations' ,
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setNotifications(response.data.data);
        }).catch(err => {
        
        });;
    }, [])

    return (
        <header className={classes.root}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent={"space-between"} spacing={2}>
                    <Grid item>
                        <Box display={"flex"} alignItems="center">
                            <IconButton>
                                <MenuIcon></MenuIcon>
                            </IconButton>
                            
                            <Typography ml={2} variant="h5" component="div">
                                {clsName}
                            </Typography>
                            {flag && 
                                <List style={{display: "flex", marginLeft: "1rem"}}>
                                    <Link to={"/" + classId + "/classDetail"} style={{margin: "0 1rem" , color: "#1B74E4"}}>
                                        Stream
                                    </Link>
                                    <Link to={"/" + classId + "/assignment"} style={{margin: "0 1rem" , color: "#1B74E4"}}>
                                        Assignment
                                    </Link>
                                    <Link to={"/" + classId + "/structGrade"} style={{margin: "0 1rem" , color: "#1B74E4"}}>
                                        Create Struct Grade
                                    </Link>
                                    <Link to={"/" + classId + "/gradeTable"} style={{margin: "0 1rem" , color: "#1B74E4"}}>
                                        Table Grade
                                    </Link>
                                    <Link to={"/" + classId + "/grade"} style={{margin: "0 1rem" , color: "#1B74E4"}}>
                                        Grade
                                    </Link>
                                </List>
                        
                            }
                        </Box>
                    </Grid>
                    
                    <Grid item >
                        <Box display={"flex"} alignItems="center">
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton >
                                                <SearchIcon></SearchIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                className={classes.input}
                            />

                            <div className={classes.notifi}>
                                <Tooltip title="Notifications">
                                    <IconButton onClick={() => {setOpenNof(!openNof)}}>
                                        <Badge badgeContent={notifications.length} color="primary">
                                            <NotificationsIcon color="action" />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                {openNof && <div className={classes.notifiNest}>
                                    <Typography ml={2} variant="h5" component="div">
                                        Notifications
                                    </Typography>
                                    {notifications.map((ele) => {
                                        return <Card style={{boxShadow: "unset"}}>
                                            <CardHeader
                                                avatar={
                                                <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="recipe">
                                                    R
                                                </Avatar>
                                                }
                                                title={ele.title}
                                                subheader="September 14, 2016"
                                            />
                                            <CardContent style={{padding: "0 1rem"}}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {ele.text}

                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    })}
                                </div>}
                            </div>
                            
                            {clsName != "AdminPage" && <Tooltip title="Add Classroom">
                                <IconButton onClick={() => {onAddClassHandle()}}>
                                    <AddIcon></AddIcon>
                                </IconButton>
                            </Tooltip>}
                            <Avatar style={{marginLeft: "1rem"}} onClick={() => {setIsOpen(!isOpen)}} sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
            {isOpen && <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText onClick={() => {onManageProfile();setIsOpen(!isOpen)}} primary="Profile" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemText onClick={() => {window.location.href = "/"}} primary="Class" />
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider/>
            </List>}
        </header>
    )

}