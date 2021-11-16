import axios from "axios";
import React, {useState} from "react";
import api from '../uri';

const SendEmail= ({classId})=>{
    const [emailTo, setEmailTo]= useState("");
    const handleChangeEmail= event=>{
        setEmailTo(event.target.value);
    }
    const handleSubmit= event=>{
        event.preventDefault();
        axios.post(api+ `/class/${classId}/invite`, {email: emailTo})
        .then(response=>{
            console.log("Successful", response.data);
        })
        .catch(err=> console.log("err", err.response.data.message));
    }
    return (
        <>
            <form onSubmit= {handleSubmit}>
                <label>Enter email</label>
                <input type="text" placeholder="enter email" value={emailTo} onChange={handleChangeEmail}></input>
                <button type="submit">Send email</button>
            </form>
        </>
    )
}

export default SendEmail;