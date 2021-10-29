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



export default function AddClassForm({onSubmit}) {
    const [cname, setCname] = useState("")
    const [tcher, setTcher] = useState("")

    function handleChange(event) {
       setCname(event.target.value);
    }

    function handleSubmit(event) {
        onSubmit({className: cname, teacher: tcher});
    }
    return (
        <div>
            <Box component="form" noValidate autoComplete="off">
                <Typography variant="h4" component="div" color="black" style={{textAlign: "center", marginBottom: "1.5rem"}}>
                    Add new class
                </Typography>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="cname">Class Name</InputLabel>
                    <Input id="cname" value={cname} onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="tcher">Teacher Name</InputLabel>
                    <Input id="tcher" value={tcher} onChange={(e) => setTcher(e.target.value)} />
                </FormControl>
                <Button onClick={() => {handleSubmit()}} style={{marginTop: "1.5rem"}} variant="contained">Create</Button>
            </Box>
        </div>
    )
}