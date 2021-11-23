import React , {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

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
    }
  });


export default function GradeItem({list, title}){
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
                {list.map((ele,idx) => {
                    return (
                            <ListItem className={classes.listItem} style={{alignItems: "unset"}}>
                                    <ListItemText 
                                        primary={ele.nameItem} 
                                        style={{marginTop: 0}}/>
                                    <Typography variant="body2"  color="black">
                                        Grade: {ele.gradeItem}
                                    </Typography>
                            </ListItem>
                    )
                })}
                
            </List>
        </div>
    )

}