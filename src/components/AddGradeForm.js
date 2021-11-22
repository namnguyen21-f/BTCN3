import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';



export default function AddGradeForm({onSubmit}) {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState("")

    function handleSubmit(event) {
        onSubmit({gradeName: name, grade: grade});
    }
    return (
        <div>
            <Box component="form" noValidate autoComplete="off">
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="name">Name Of Component Grade</InputLabel>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl style={{width: "100%"}} variant="standard">
                    <InputLabel htmlFor="grade">Grade</InputLabel>
                    <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                </FormControl>
                <Button onClick={() => {handleSubmit()}} style={{marginTop: "1.5rem"}} variant="contained">Create</Button>
            </Box>
        </div>
    )
}