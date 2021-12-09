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

    function lockAcc(){
        axios.post(api +  'admin/' + row._id + '/ban' , {} , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setStatus('Banned');
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
                    {row.userName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role == "user" ? 'student' : row.role}</TableCell>
                <TableCell align="right">{row.studentId}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        {(status == "Banned" || !status ) && <Button onClick={() => unlockAcc()} variant="contained">UnLock Account</Button>}
                        {(status == "Onboard") && <Button onClick={() => lockAcc()} variant="contained">Lock Account</Button>}
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function AccountManage({accData}) {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{background: "#333"}}> 
                        <TableRow>
                            <TableCell />
                            <TableCell style={{color: "#fff"}}>UserName</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Email</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Role</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">StudentId</TableCell>
                            <TableCell style={{color: "#fff"}} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accData.map((row) => (
                            <Row key={row.email} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

