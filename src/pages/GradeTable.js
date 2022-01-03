import axios from "axios";
import api from '../uri';
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { saveAs } from 'file-saver';
import {TextField, Link, Grid} from '@mui/material';
import { IconButton, MenuItem, Menu, Container } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React from "react";
import PopUp from "../components/Popup";
import { Typography, Box, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function startDownload(file, fileName) {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}

const GradeTable= ()=>{
    const { id } = useParams();
    const [file, setFile]= useState();
    const [cls , setCls] = useState(null);
    const [listStudent, setListStudent]= useState([]);
    const [listStudentSigned, setListStudentSigned]= useState([]);
    const [popupFile, setPopupFile]= useState(false);
    const [listAssignemnt, setListAssignment]= useState([])
    const [listTotalGrade, setListTotalGrade]= useState(null)
    const [finalize, setFinalize]= useState([])

    useEffect(() => {
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
            let cls= response.data;
            setCls(cls);
            setListStudent(cls.studentList);
        });

        axios.get(api + `class/${id}/getClassAte`,  
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
        .then(response=>{
            setListStudentSigned(response.data.data.s_arr);
        })
        .catch(err=> console.log("err", err.response.data.message));

        axios.get(api+ `class/${id}/getTotalGrade`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            setListTotalGrade(response.data.data)
        })
        .catch(err=>{
            console.log('err', err)
        })

        axios.get(api+ `class/${id}/getAss`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            setListAssignment(response.data)
        })
        .catch(err=>{
            console.log('err', err)
        })

        axios.get(api+ `class/${id}/studentMarked`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response=>{
            setFinalize(response.data)
        })
        .catch(err=>{
            console.log('err', err)
        })


    }, []);

    const style = {
        width: '100%',
        maxWidth: 260,
        bgcolor: 'background.paper',
        top: "100%",
        right: "0",
        position: "absolute",
        zIndex: "999",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    };

    const downloadStructStudent= ()=>{
        axios.get(api +  'class/sl/template', 
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            const dirtyFileName = response.headers['content-disposition'];
            const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
            var  fileName = dirtyFileName.match(regex)[3];
            
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, fileName);
        }).catch(err => {
            alert(err.response.data.message);
        });;
    }

    const uploadStudentList= ()=>{
        const formData= new FormData();
        formData.append("files", file);
        if(!formData){console.log('empty')};
        try{
            axios.post(api +  `class/${id}/uploadSL/xlsx`, formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
            .then(response => {
                alert("Successful");
            }).catch(err => {
                alert(err.response.data.message);
            });
        }catch(err){
            console.log(err);
        }
    }

    const checkMapStudent= (studentId)=>{
        for(let i=0;i<listStudentSigned.length;i++){
            if(studentId == listStudentSigned[i].studentId){
                return <TableCell><Link href="#">{studentId}</Link></TableCell>
            }
        }
        return <TableCell>{studentId}</TableCell>
    }

    const downloadStructAss= (popupState)=>{
        popupState.close();
        axios.get(api +  '/class/grade/template', 
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            const dirtyFileName = response.headers['content-disposition'];
            const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
            var  fileName = dirtyFileName.match(regex)[3];
            
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, fileName);
        }).catch(err => {
            alert(err.response.data.message);
        });;
    }

    const popupUpload= (popupState, assId)=>{
        popupState.close();
        setPopupFile(true);
    }

    const chooseFile= (e)=>{
        setFile(e.target.files[0]);        
    }

    const uploadGradeAss= (assId)=>{
        const formData= new FormData();
        formData.append("files", file);
        if(!formData){console.log('empty')};
        try{
            axios.post(api +  `/class/${id}/${assId}/upload/grade`, formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Authorization'),
                },
            })
            .then(response => {
                alert("Successful");
            }).catch(err => {
                alert(err.response.data.message);
            });
        }catch(err){
            console.log(err);
        }
    }

    const inputGradeStudent= (gradeAss, assId, stuId)=>{
        
        axios.post(api +  `/class/${id}/${assId}/${stuId}/update/grade`, {grade: gradeAss, studentId: stuId},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    
    const getGradeStudent= (studentId, assId)=>{
        for(let ass of listAssignemnt){
            if(assId == ass._id){
                for(let stu of ass.studentGrade){
                    if(stu.studentId == studentId){
                        return stu.grade
                    }
                }
            }
        }
        // return 0
    }


    const getTotalGradeEachStudent= (studentId)=>{
        for(let stu of listTotalGrade){
            if(stu.studentId == studentId){
                return <TableCell>{stu.mean}</TableCell>
            }
        }
    }

    const markFinalize= (assId)=>{
        axios.post(api +  `/class/${id}/${assId}/markFinalize`, {mark: true},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            setFinalize([...finalize, assId])
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    const setColorMark= (assId)=>{
        for(let i=0; i<finalize.length; i++){
            if(assId == finalize[i]){
                return true
            }
        }
        return false
    }


    return (
        <div>
            <Box sx={
                {width: 600, height: 50, mt: 5, textAlign: 'center', ml: 1}
            }>
                <Grid container justifyContent={"space-between"} spacing={0}>
                    <Button onClick={downloadStructStudent}>Download List Student</Button>
                    <input type="file" onChange={chooseFile}/>
                    <Button onClick={uploadStudentList}>Upload</Button>
                </Grid>
            </Box>
            {cls && 
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow style={{textAlign: 'center'}}>
                                <TableCell>Student Id</TableCell>
                                {cls.assignmentList.map(ass=>(
                                    <TableCell id={ass._id.toString()}>{ass.name}
                                        <PopupState variant="popover">
                                            {(popupState)=>(
                                                <React.Fragment>
                                                    <IconButton variant="contained" {...bindTrigger(popupState)}>
                                                        <FontAwesomeIcon icon={faEllipsisV} size="xs"/>
                                                    </IconButton>
                                                    <Menu {...bindMenu(popupState)}>
                                                        <MenuItem onClick={()=> {downloadStructAss(popupState)}}>Download</MenuItem>
                                                        <MenuItem onClick={()=>{popupUpload(popupState)}}>Upload</MenuItem>
                                                    </Menu>
                                                </React.Fragment>
                                            )

                                            }
                                        </PopupState>
                                        <CheckCircleIcon onClick={()=>{markFinalize(ass._id)}} color={setColorMark(ass._id) ? "primary": "default"} fontSize="small"></CheckCircleIcon>
                                        {popupFile && 
                                            <PopUp onClose={()=>{setPopupFile(false)}}>
                                                <Box component="form" noValidate autoComplete="off">
                                                    <Typography variant="h4" component="div" color="black" style={{textAlign: "center", marginBottom: "1.5rem"}}>
                                                        Select file to upload
                                                    </Typography>
                                                    <input type="file" onChange={chooseFile}/>
                                                    <Button onClick={() => {uploadGradeAss(ass._id)}} variant="contained">Upload</Button>
                                                </Box>
                                            </PopUp>}
                                    </TableCell>
                                ))}
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listTotalGrade && listStudent.map(student=>(
                                <TableRow id={student.studentId.toString()}>
                                    {checkMapStudent(student.studentId)}
                                    {cls.assignmentList.map(ass=>(
                                        <TableCell id={Math.random().toString()}>
                                                <TextField type="number" onChange={(e)=> inputGradeStudent(e.target.value, ass._id, student.studentId)} 
                                                    value={getGradeStudent(student.studentId, ass._id)} variant="standard"/>
                                        </TableCell>
                                    ))}
                                    {getTotalGradeEachStudent(student.studentId)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            }
        </div>
    )
}

export default GradeTable;