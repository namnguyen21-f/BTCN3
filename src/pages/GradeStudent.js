import axios from "axios";
import api from '../uri';
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Typography, Box, TextField, Button, Grid } from '@mui/material';
import PopUp from "../components/Popup";


const GradeStudent= ()=>{
    let grade
    let message
    const { id } = useParams();
    const [cls, setCls]= useState(null)
    const [listGrade, setListGrade]= useState([])
    const [popupRequest, setPopupRequest]= useState(false)
    useEffect(()=>{
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
            setCls(response.data);
        });

        axios.get(api+ `class/${id}/getGradeUser`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            setListGrade(response.data)
        })
        .catch(err=> {
            if(err.response.data.message== "Teacher does not have permisson"){
                alert("Teacher does not have permisson")
            }else{
                alert(err.response.data.message)
            }
        });

    }, [])

    const getGradeAssignment= (assId)=>{
        console.log(listGrade)
        if(listGrade.gradeAss){
            for(let grade of listGrade.gradeAss){
                if(grade[0]==assId){
                    return grade[1]
                }
            }
        }
    }

    const sendRequest= (assId)=>{
        axios.post(api+ `/class/${id}/${assId}/review`,{grade: grade, text: message, studentId: listGrade.studentId},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setPopupRequest(false)
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    return (
        <div>
            {cls && 
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow style={{textAlign: 'center'}}>
                                <TableCell>Student Id</TableCell>
                                {cls.assignmentList.map(ass=>(
                                    <TableCell id={ass._id}>{ass.name}
                                        <RequestQuoteIcon onClick={()=>setPopupRequest(true)} fontSize="small"></RequestQuoteIcon>
                                        {popupRequest && 
                                            <PopUp onClose={()=>{setPopupRequest(false)}}>
                                                <Box component="form" noValidate autoComplete="off">
                                                    <Typography variant="h4" component="div" color="black" style={{textAlign: "center", marginBottom: "1.5rem"}}>
                                                        Request a review
                                                    </Typography>
                                                    <Grid container direction={"column"} spacing={3}>
                                                        <Grid item>
                                                            <TextField type="number" variant="standard" label="Grade" onChange={(e)=> {grade= e.target.value}}/>
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                            id="standard-search"
                                                            label="Explanation message"
                                                            type="search"
                                                            variant="standard"
                                                            fullWidth
                                                            onChange={(e)=> {message= e.target.value}}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" onClick={()=> sendRequest(ass._id)}>Send</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </PopUp>}
                                    </TableCell>

                                )
                                )}
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listGrade &&
                                <TableRow>
                                    <TableCell>{listGrade.studentId}</TableCell>
                                    {cls.assignmentList.map(ass=>(
                                        <TableCell id={Math.random().toString()}>
                                            {getGradeAssignment(ass._id)}
                                        </TableCell>
                                    ))
                                    }
                                    <TableCell>{listGrade.overall}</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
            }
        </div>
    )
}

export default GradeStudent