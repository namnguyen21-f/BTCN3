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
        
    }, [])

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

    return (
        <div>
            <button onClick={downloadStructStudent}>Download Structural Grade</button>
            <input type="file" onChange={onChange}/>
            <button onClick={uploadStudentList}>Submit</button>
            {cls && 
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Id</TableCell>
                                {cls.assignmentList.map(ass=>(
                                    <TableCell id={ass._id}>{ass.name}</TableCell>
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
                                    {/* <TableCell>{student.studentId}</TableCell> */}
                                    {cls.assignmentList.map(ass=>(
                                        <TableCell id={ass._id}><input type="number"/></TableCell>
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