import axios from "axios";
import api from '../uri';
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';


const GradeStudent= ()=>{
    const { id } = useParams();
    const [cls, setCls]= useState(null)
    const [listGrade, setListGrade]= useState([])
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

    return (
        <div>
            {cls && 
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow style={{textAlign: 'center'}}>
                                <TableCell>Student Id</TableCell>
                                {cls.assignmentList.map(ass=>(
                                    <TableCell id={ass._id}>{ass.name}</TableCell>
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