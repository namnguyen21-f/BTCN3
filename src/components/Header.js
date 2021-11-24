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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';


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

export default function Header({className , onAddClassHandle, onManageProfile, classId}){
    const classes = useStyles();
    const [isOpen , setIsOpen] = useState(false);
    let clsName = "[CLC]PTUDWNC - 18KTPM1";
    let flag= false;

    if(className){
        flag= true;
        clsName= className;
    }

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
                                    <Link to={"/" + classId + "/classDetail"} style={{margin: "0 1rem"}}>
                                        Stream
                                    </Link>
                                    <Link to={"/" + classId + "/assignment"}>
                                        Assignment
                                    </Link>
                                    <Link to={"/" + classId + "/structGrade"} style={{margin: "0 1rem"}}>
                                        Create Struct Grade
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
                            
                            <Tooltip title="Add Classroom">
                                <IconButton onClick={() => {onAddClassHandle()}}>
                                    <AddIcon></AddIcon>
                                </IconButton>
                            </Tooltip>
                            <Avatar onClick={() => {setIsOpen(!isOpen)}} sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
            {isOpen && <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText onClick={() => {onManageProfile()}} primary="Profile" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemText primary="Class" />
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