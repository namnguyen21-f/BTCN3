import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import api from '../uri';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';



const GradeReview= ()=>{
    const {id}= useParams();
    const [cls, setCls]= useState(null)

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
            
        }).catch(err => {
            alert(err.response.data)
        });

    }, [])

    return (
        <div>
            {cls &&
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            }
        </div>
    )
}

export default GradeReview