    import axios from "axios";
import React, {useState} from "react";
import api from '../uri';
import { Container ,Box, Grid, Link , TextField , Typography, FormControlLabel,
    Checkbox, Button, Copyright} from '@mui/material';
import InputAdornment from "@material-ui/core/InputAdornment";

const SendEmail= ({classId})=>{
    const [link, setLink]= useState("");
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

    const handleSubmitLink = event=>{
        event.preventDefault();
    
        axios.post("https://midtermproject160220.herokuapp.com/api/" + `class/${classId}/inviteUrl`
            , {} ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
        .then(response=>{
            setLink(response.data.data);
        })
        .catch(err=> console.log("err", err.response.data.message));
    }

    

    return (
        <>
            <Container  component="main">
                <form onSubmit= {handleSubmit} noValidate>
                    <Grid item xs={12} display="flex" alignItems="center" mt={2}>
                        <Typography variant="h6" component="h6" mr={2}>
                            Send inviation via email:
                        </Typography>
                        <TextField
                            value={emailTo}
                            onChange={handleChangeEmail}
                            label="Enter email invite"
                        />
                        <Button
                            style={{marginLeft: ".5rem"}}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Send
                        </Button>
                    </Grid>
                </form>
                <form onSubmit= {handleSubmitLink} noValidate>
                    <Grid item display="flex" alignItems="center" mt={2}>
                        <Typography variant="h6" component="h6" mr={2}>
                            Generate Class Link :
                        </Typography>
                        <TextField
                            value={link}
                            
                        />
                        <Button
                            style={{marginLeft: ".5rem"}}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Genrate
                        </Button>
                    </Grid>
                </form>
            </Container>
        </>
    )
}

export default SendEmail;