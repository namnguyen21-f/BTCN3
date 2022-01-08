import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import api from '../uri';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Grid, Divider, Box, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';



const GradeReview= ()=>{
    let comment
    const {id}= useParams();
    const [cls, setCls]= useState(null)
    const [allRequest, setAllRequest]= useState([])
    const [oldGrade, setOldGrade]= useState()
    const [reqDetail, setReqDetail]= useState()

    useEffect(()=>{
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{ 
            setCls(response.data);
        });

        axios.get(api+ `class/${id}/getAllRequest`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setAllRequest(response.data)
        }).catch(err => {
            alert(err.response.data)
        });

    }, [])

    const setStatus= (req)=>{
        axios.get(api+ `class/${req.studentId}/${req.assId}/getOldGrade`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setOldGrade(response.data)
            setReqDetail(req._id)
        }).catch(err => {
            alert(err.response)
        });
    }

    const getDetail= (req)=>{
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{req.studentId}</TableCell>
                        <TableCell>Current grade: {oldGrade}</TableCell>
                        <TableCell>Expectation grade: {req.grade}</TableCell>
                        <TableCell>{req.text}</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        )
    }

    const addAComment=(studentId, assId)=>{
        let flag=0
        for(let req of allRequest){
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
            
        }).catch(err => {
            alert(err.response.data.err)
        });

    }

    return (
        <div>
            {cls &&
                <Container>
                        <Box>
                            <Grid container layout={"row"} spacing={5}>
                                {cls.assignmentList.map(ass=>(
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Typography variant="h6" p={1}>{ass.name}</Typography>
                                            <Divider/>
                                            {allRequest.map(req=>(
                                                ass._id==req.assId &&
                                                <div>
                                                    <Divider/>
                                                    <Box p={1} onClick={()=>{setStatus(req)}}>
                                                        <Typography>{req.studentId}</Typography>
                                                        <Typography>{req.text}</Typography>
                                                    </Box>
                                                    {reqDetail==req._id && 
                                                        <Box>
                                                            <Divider/>
                                                            {getDetail(req)}
                                                            <Box>
                                                                <Grid container layout={"row"} spacing={5}>
                                                                    <Grid item xs={12}>
                                                                        {/* <Typography pt={1} pl={1}>Comment</Typography> */}
                                                                        <Box>
                                                                            {req.comment.map(comment=>(
                                                                            <Box p={1}>
                                                                                <Typography variant="h6" style={{display: 'inline-block'}} pr={1}>{comment.name}</Typography>
                                                                                <Typography variant="body1" component="div" color="gray" style={{display: 'inline-block'}}>
                                                                                    {new Date(comment.createAt).getDate() + "-" + (new Date(comment.createAt).getMonth()+1) + "-" + new Date(comment.createAt).getFullYear()}
                                                                                </Typography>                                                                             
                                                                                <Typography>{comment.text}</Typography>
                                                                            </Box>     
                                                                            ))}
                                                                        </Box>
                                                                        <Box p={1}>
                                                                            <div style={{position: 'relative', display: 'inline-block'}}>
                                                                                <TextField variant="standard" label="Add a comment..." onChange={(e)=>{comment= e.target.value}} sx={{width: 1130}}/>
                                                                                <SendIcon onClick={()=> addAComment(req.studentId, req.assId)} fontSize="small" style={{position: 'absolute', right: 0, top: 20, width: 20, height: 20}}/>
                                                                            </div>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Box>
                                                    }   
                                                </div>)
                                            )}
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                </Container>
            }
        </div>
    )
}

export default GradeReview