import axios from "axios";
import React, {useState} from "react";
import api from '../uri';
import { Container ,Box, Grid, Link , TextField , Typography, FormControlLabel,
    Checkbox, Button, Copyright} from '@mui/material';
import InputAdornment from "@material-ui/core/InputAdornment";

const SendEmail= ({classId})=>{
    const [emailTo, setEmailTo]= useState("");
    const handleChangeEmail= event=>{
        setEmailTo(event.target.value);
    }
    const handleSubmit= event=>{
        event.preventDefault();
    
        axios.post("https://midtermproject160220.herokuapp.com/api/" + `class/${classId}/invite`
            , {email: emailTo} ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
        .then(response=>{
            alert("Successful", response.data.message);
        })
        .catch(err=> console.log("err", err.response.data.message));
    }


    return (
        <>
            <Container  component="main" maxWidth="xs">
                <form onSubmit= {handleSubmit} noValidate>
                    <Grid item xs={12}>
                            <TextField
                                value={emailTo}
                                onChange={handleChangeEmail}
                                label="Enter email invite"
                            />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary">
                            Send
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    )
}

export default SendEmail;