import React,{useState , Fragment} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import axios from 'axios'
import api from '../uri';

function Row({row}){
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(row.status);
    function unlockAcc(){
        axios.post(api +  'admin/' + row._id + '/unban' , {} , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setStatus('Onboard');
        }).catch(err => {
        
        
        });
    }


    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.className}
                </TableCell>
                <TableCell align="right">{row.assignmentList.length || "null"}</TableCell>
                <TableCell align="right">{row.teacher}</TableCell>
                <TableCell align="right">{row.createdBy}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        {(status == "Banned" || !status ) && <Button onClick={() => {}} variant="contained">Remove</Button>}
                        {(status == "Onboard") && <Button onClick={() => {}} variant="contained">Remove</Button>}
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ClassManage({accData}) {
    console.log(accData)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{background: "#333"}}> 
                        <TableRow>
                            <TableCell />
                            <TableCell style={{color: "#fff"}}>ClassName</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Assigments</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Teacher</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">CreateById</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accData.map((row) => (
                            <Row key={row._id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

