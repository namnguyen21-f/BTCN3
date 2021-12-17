import React , {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import axios from 'axios'
import api from '../uri';

const useStyles = makeStyles({
    root: {
      padding: "1rem 0",
      
    },
    input: {
        padding: 0,
        "& input" : {
            padding: "0.5rem",
        }
    },
    listItem: {
        border: "1px solid rgba(0, 0, 0, 0.2) !important",
        borderRadius: "2rem",
        padding: "1rem !important",
        marginTop: "1.25rem",
        backgroundColor: "rbga(0 ,0 ,0 ,.6) !important",
        "& *":{
            fontSize: "99%"
        }
    }
  });


export default function Assignment({user, assList, title, cls , onRemove}){
    const classes = useStyles();
    return (
        <div className={classes.root}>
           <List 
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Typography variant="h6" component="div" color="black">
                            {title}
                        </Typography>
                    </ListSubheader>
                  }
                >
                {assList.map((ele,idx) => {
                    return (
                        <ListItem component="a" href={"/" + cls._id + "/assignment/" + ele._id} className={classes.listItem} style={{alignItems: "unset"}}>
                            <Box display="flex" justifyContent="space-between" style={{width: "100%"}}>
                                <Box component="div" >
                                    <Typography variant="h6" component="div" color="black">
                                        Name: {ele.name}
                                    </Typography>
                                    
                                    <Typography variant="h6" component="div" color="black">
                                        Grade: {ele.grade}
                                    </Typography>
                                    <Typography variant="body1" component="div" color="gray">
                                        Created At: {new Date(ele.createdAt).getDate() + " " + new Date(ele.createdAt).getMonth() + " " + new Date(ele.createdAt).getFullYear()}
                                    </Typography>
                                </Box>
                                {user.role == "teacher" && cls.createdBy == user._id && <Box component="div" style={{width: "100px"}}>
                                    <Button component="div" style={{width: "100px" , marginBottom: "4px"}} variant="contained"  onClick={(e) => {
                                            e.preventDefault();
                                        }}>
                                        Update
                                    </Button>
                                    <Button component="div" style={{width: "100px"}} variant="contained" onClick={(e) => {
                                            e.preventDefault();onRemove(ele._id);
                                        }}>
                                        Remove
                                    </Button>
                                </Box>}
                               
                                
                            </Box>

                        </ListItem>
                    )
                })}
                
            </List>
        </div>
    )

}