import { List } from "@mui/material";
import axios from "axios";
import { useState , useEffect} from "react";
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import api from "../uri";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const ShowListTS= ({classId})=>{
    const [list, setList]= useState(null);

    useEffect(() => {
        axios.get(api + `class/${classId}/getClassAte`,  
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            console.log(response.data.data)
            setList(response.data.data);
        })
        .catch(err=> console.log("err", err.response.data.message));
    }, [])
    return (
        <>
            {list && <div style={{marginTop: "1rem"}}>
                <List>
                    <div>
                        <Typography variant="h4" component="div">
                            Teacher
                        </Typography>
                        {list.t_arr.map((ele,idx) => {
                            return (
                                <Box sx={{ display: 'flex' , alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] , marginRight: "1rem" }}  aria-label="recipe">
                                        {ele.firstName[0]}
                                    </Avatar>
                                    <Typography variant="h6" component="div">
                                        {ele.firstName + " " + ele.lastName}
                                    </Typography>
                             
                                </Box>
                            )
                        })}
                    </div>
                    <div style={{marginTop: "1rem"}}>
                        <Typography variant="h4" component="div">
                            Student
                        </Typography>
                        {list.s_arr.map((ele,idx) => {
                            return (
                                <Box sx={{ display: 'flex' , alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] , marginRight: "1rem" }}  aria-label="recipe">
                                        {ele.firstName[0]}
                                    </Avatar>
                                    <Typography variant="h6" component="div">
                                        {ele.firstName + " " + ele.lastName}
                                    </Typography>
                             
                                </Box>
                            )
                        })}
                    </div>
                </List>
            </div>
            }
        </>
    )
}

export default ShowListTS;