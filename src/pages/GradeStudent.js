import axios from "axios";
import api from '../uri';
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, AlertTitle} from '@mui/material';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Typography, Box, TextField, Button, Grid, Alert, Divider} from '@mui/material';
import PopUp from "../components/Popup";
import SendIcon from '@mui/icons-material/Send';


const GradeStudent= ()=>{
    let grade
    let message
    let comment
    const { id } = useParams();
    const [cls, setCls]= useState(null)
    const [listGrade, setListGrade]= useState([])
    const [popupRequest, setPopupRequest]= useState(false)
    const [listRequest, setListRequest]= useState([])

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
                alert(err.response.data.err)
            }
        });

        axios.get(api+ `class/${id}/getAllRequest`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            setListRequest(response.data)
        })
        .catch(err=>{
            alert(err.response.data.err)
        })

    }, [])

    const getGradeAssignment= (assId)=>{
        if(listGrade.gradeAss){
            for(let grade of listGrade.gradeAss){
                if(grade[0]==assId){
                    return grade[1]
                }
            }
        }
    }

    const sendRequest= (assId, assName)=>{
        axios.post(api+ `/class/${id}/${assId}/review`,{grade: grade, text: message, studentId: listGrade.studentId, assName: assName},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setPopupRequest(false)
        }).catch(err => {
            alert(err.response.data.err)
        });
    }

    const addAComment=(studentId, assId)=>{
        let flag=0
        for(let req of listRequest){
            if(req.assId==assId){
                flag=1
            }
        }
        if(flag==0){
            return alert("You must send a request for this assignment")
        }
        axios.post(api+ `/class/${studentId}/${assId}/comment`, {text: comment},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=> {
            // alert(response.data.message)
        }).catch(err => {
            alert(err.response.data.err)
        });

    }

    return (
        <div>
            {cls && 
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow style={{textAlign: 'center'}}>
                                    <TableCell>Student Id</TableCell>
                                    {cls.assignmentList.map(ass=>(
                                        <TableCell id={ass._id}>{ass.name}
                                            <RequestQuoteIcon onClick={()=>setPopupRequest(true)} fontSize="small" style={{top: 10}}></RequestQuoteIcon>
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
                                                                <Button variant="contained" onClick={()=> sendRequest(ass._id, ass.name)}>Send</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </PopUp>}
                                        </TableCell>
                                    )
                                    )}
                                    <TableCell>Overall</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listGrade.length != 0 &&
                                    <TableRow>
                                        <TableCell>{listGrade.studentId}</TableCell>
                                        {cls.assignmentList.map(ass=>(
                                            <TableCell key={Math.random().toString()}>
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
                    
                    <Container>
                        <Box m={2}>
                            <Typography variant="h5" pb={2}>Comment</Typography>
                            <Grid container layout={"row"} spacing={5}>
                                {cls.assignmentList.map(ass=>(
                                <Grid item key={ass.id} xs={12}>
                                    <Paper>
                                        <Typography p={1}>{ass.name}</Typography>
                                        <Divider/>
                                        <Box>
                                            {listRequest.map(req=>(
                                                req.studentId == listGrade.studentId && ass._id == req.assId && 
                                                    req.comment.map(comment=>(
                                                    <Box p={1}>
                                                        <Typography variant="h6" style={{display: 'inline-block'}} pr={1}>{comment.name}</Typography>
                                                        <Typography variant="body1" component="div" color="gray" style={{display: 'inline-block'}}>
                                                            {new Date(comment.createAt).getDate() + "-" + (new Date(comment.createAt).getMonth()+1) + "-" + new Date(comment.createAt).getFullYear()}
                                                        </Typography>
                                                        <Typography>{comment.text}</Typography>
                                                    </Box>     
                                                    ))
                                            ))}
                                        </Box>
                                        <Box p={1}>
                                            <div style={{position: 'relative', display: 'inline-block'}}>
                                                <TextField variant="standard" label="Add a comment..." onChange={(e)=>{comment= e.target.value}} sx={{width: 1100}}/>
                                                <SendIcon onClick={()=> addAComment(listGrade.studentId, ass._id)} fontSize="small" style={{position: 'absolute', right: 0, top: 20, width: 20, height: 20}}/>
                                            </div>
                                        </Box>
                                    </Paper>
                                </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Container>
                    
                </div>
            }
        </div>
    )
}

export default GradeStudent