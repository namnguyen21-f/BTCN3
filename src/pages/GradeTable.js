import axios from "axios";
import api from '../uri';
import { useParams } from "react-router";
import { useState } from "react";

const GradeTable= ()=>{
    const { id } = useParams();
    const [file, setFile]= useState();
    const [filename, setFilename]= useState(false);
    const downloadStructStudent= ()=>{
        axios.get(api +  'class/sl/template', 
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
        });;
    }

    const onChange= (e)=>{
        setFile(e.target.files[0]);
        setFilename(true);
        
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

    return (
        <div>
            <button onClick={downloadStructStudent}>Download Structural Grade</button>
            {/* <form onSubmit={uploadStudentList}> */}
                <input type="file" onChange={onChange}/>
                {/* <input type="submit"/> */}
                <button onClick={uploadStudentList}>Submit</button>
            {/* </form> */}
        </div>
    )
}

export default GradeTable;