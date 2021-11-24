import React , {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


export default function Assignment({assList, title}){
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
                        <ListItem className={classes.listItem} style={{alignItems: "unset"}}>
                            <ListItemText 
                                primary={"Name: "+ ele.name} 
                                style={{marginTop: 0}}/>
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ele.fieldArray.map((row , idx) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {idx}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.grade}</TableCell>
                                        
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </ListItem>
                    )
                })}
                
            </List>
        </div>
    )

}