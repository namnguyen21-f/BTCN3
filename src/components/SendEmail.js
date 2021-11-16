import React, {useState} from "react";

const SendEmail= ()=>{
    const [emailTo, setEmailTo]= useState("");
    const handleChangeEmail= event=>{
        setEmailTo(event.target.value);
    }
    const handleSubmit= event=>{
        event.preventDefault();
        console.log(emailTo);
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