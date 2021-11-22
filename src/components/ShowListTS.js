import { List } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Button} from '@mui/material';
import api from "../uri";


const ShowListTS= ({classId})=>{
    const [list, setList]= useState(null);
    const handleSubmit= event=>{
        event.preventDefault();
        axios.post(api + `class/${classId}/getClassAte`, {} , 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
        .then(response=>{
            console.log(response.data);
            setList(response.data.data);
        })
        .catch(err=> console.log("err", err.response.data.message));
    }
    return (
        <>
            <form onSubmit= {handleSubmit} noValidate style={{marginTop: "2rem"}}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary">
                    Show List Teacher And Student
                </Button>
            </form>
                {list && <List>
                        <h2>Teacher</h2>
                        {list.t_arr.map((ele,idx) => {
                            return (
                                <ListItemText 
                                    primary={ele.email} 
                                    style={{marginTop: 0}}/>
                            )
                        })}
                        <h2>Student</h2>
                        {list.s_arr.map((ele,idx) => {
                            return (
                                <ListItemText 
                                    primary={ele.email} 
                                    style={{marginTop: 0}}/>
                            )
                        })}
                    </List>
            }
        </>
    )
}

export default ShowListTS;