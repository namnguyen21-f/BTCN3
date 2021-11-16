import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Typography } from '@mui/material';



export default function ManageProfileForm({onSubmit}) {
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    function handleSubmit(event) {
        onSubmit({firstName: fName, lastName: lName, userName: username, password: password, phone: phone});
    }
    return (
        <div>
            <Box component="form" noValidate autoComplete="off">
                <Typography variant="h4" component="div" color="black" style={{textAlign: "center", marginBottom: "1.5rem"}}>
                    Manage Personal Profile
                </Typography>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="fName">First Name</InputLabel>
                    <Input id="fName" value={fName} onChange={(e) => setFName(e.target.value)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="lName">Last Name</InputLabel>
                    <Input id="lName" value={lName} onChange={(e) => setLName(e.target.value)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </FormControl>

                <Button onClick={() => {handleSubmit()}} style={{marginTop: "1.5rem"}} variant="contained">Change</Button>
            </Box>
        </div>
    )
}