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
import {TextField, List, ListItem, ListItemText} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
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
    const [listStudentSigned, setListStudentSigned]= useState(null);
    const [checkStudentSigned, setCheckStudentSigned]= useState(false);
    const [isOpen, setIsOpen]= useState(false);
    const [listGrade, setListGrade]= useState([]);
    // const [grade, setGrade]= useState(0);

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

    const onChange= (e)=>{
        setFile(e.target.files[0]);        
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
                console.log(response);
            }).catch(err => {
                alert(err.response.data.message);
            });
        }catch(err){
            console.log(err);
        }
    }

    const checkMapStudent= (studentId)=>{
        listStudentSigned.map(student=>{
            if(studentId == student.studentId){
                setCheckStudentSigned(true);
            }
        });
        if(checkStudentSigned){
            setCheckStudentSigned(false);
            return <TableCell><a href="#">{studentId}</a></TableCell>;
        }
        return <TableCell>{studentId}</TableCell>
    }

    const downloadStructAss= ()=>{
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
                console.log(response);
            }).catch(err => {
                alert(err.response.data.message);
            });
        }catch(err){
            console.log(err);
        }
    }

    const inputGradeStudent= (gradeAss, assId, stuId)=>{
        
        axios.post(api +  `/class/${id}/${assId}/${stuId}/update/grade`, {grade: gradeAss},
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

    const getListGrade= (assId)=>{
        axios.get(api +  `/class/${id}/${assId}/download/xlsx`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization'),
            },
        })
        .then(response => {
            console.log(response);
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    return (
        <div>
            <button onClick={downloadStructStudent}>Download List Student</button>
            <input type="file" onChange={onChange}/>
            <button onClick={uploadStudentList}>Upload</button>
            {/* <Button variant="contained" component="label" onClick={uploadStudentList}> Upload File
                    <input type="file" hidden />
            </Button> */}
            {cls && 
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow style={{textAlign: 'center'}}>
                                <TableCell>Student Id</TableCell>
                                {cls.assignmentList.map(ass=>(
                                    <TableCell id={ass._id}>{ass.name}
                                        {/* <MoreVertIcon onClick={()=>{setIsOpen(!isOpen)}}/>
                                        {isOpen && <List sx={style} component="nav" aria-label="mailbox folders">
                                            <ListItem button>
                                                <ListItemText onClick={downloadStructAss} primary="Download template" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button >
                                                <ListItemText onClick={()=>{uploadGradeAss(ass._id)}} primary="Upload grade"/>
                                            </ListItem>
                                            <Divider/>
                                        </List>} */}
                                        <button onClick={downloadStructAss}>Download Structural Grade</button>
                                        <input type="file" onChange={onChange}/>
                                        <button onClick={()=>{uploadGradeAss(ass._id)}}>Upload</button>
                                    </TableCell>
                                ))}
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listStudent.map(student=>(
                                <TableRow id={student.studentId}>
                                    { listStudentSigned &&
                                        checkMapStudent(student.studentId)
                                    }
                                    {cls.assignmentList.map(ass=>(
                                        // {getListGrade(ass._id)}
                                        <TableCell id={ass._id}>
                                            <TextField type="number" variant="standard" onChange={(e)=> inputGradeStudent(e.target.value, ass._id, student.studentId)}/>
                                        </TableCell>
                                    ))}
                                    <TableCell></TableCell>
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