import React , {useState , useEffect} from 'react'
import Header from '../components/Header';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';
import { Container } from '@mui/material';
import PopUp from '../components/Popup';

import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../uri';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AddGradeForm from '../components/AddGradeForm';



const StructuralPage= ()=>{
    const { id } = useParams();
    const [cls , setCls] = useState(null);
    const [isPopup, setisPopup] = useState(false)
    const [isPopupProfile, setisPopupProfile] = useState(false)
    const [newGrade, setNewGrade] = useState(false);

    useEffect(() => {
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
            console.log(response.data);
            let cls= response.data;
            setCls(cls);
          
        });
        
    }, [])

    function onSubmitClassForm(data) {
    
        axios.post(api +  'class/new' , {teacher : data.teacher, className: data.className} ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        })
        .then(response => {
          setisPopup(false);
        }).catch(err => {
          if (err.response.data.message === "Student does not have permisson"){
            alert("Student does not have permisson") 
          }else {
            alert("Something wrong") 
          }
          setisPopup(false);
        });;
    }
    
    function onSubmitProfileForm(data) {
    axios.post(api +  'changeProfile' , data ,
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
        },
    })
    .then(response => {
        setisPopupProfile(false);
    }).catch(err => {
        if (err.response.data.message === "User is not valid"){
        alert("User is not valid") 
        }
        setisPopupProfile(false);
    });;
    }

    const addGradeForm= (data)=>{
        axios.post(api +  'grade/new' , {gradeName : data.gradeName, grade: data.grade} ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        })
        .then(response => {
          setNewGrade(false);
        }).catch(err => {
          if (err.response.data.message === "Student does not have permisson"){
            alert("Student does not have permisson") 
          }else {
            alert("Something wrong") 
          }
          setNewGrade(false);
        });;

    }

    return(
        <div className="App">
            {isPopup && 
                <PopUp onSubmit={(data) => {onSubmitClassForm(data)}} onClose={() => {setisPopup(false)}}>
                    <AddClassForm onSubmit={onSubmitClassForm}></AddClassForm>
                </PopUp>}
            {isPopupProfile && 
                <PopUp onSubmit={(data) => {onSubmitClassForm(data)}} onClose={() => {setisPopupProfile(false)}}>
                    <ManageProfileForm onSubmit={onSubmitProfileForm}></ManageProfileForm>
                </PopUp>}
            { cls &&
                <Header classId= {cls.id}
                    className={cls.className} 
                    onManageProfile = {() => {setisPopupProfile(true)}}
                    onAddClassHandle={() => {setisPopup(true)}}>
                </Header>}

            {cls &&
                <Tooltip title="Add Component Grade">
                    <IconButton onClick={setNewGrade(true)}>
                        <AddIcon></AddIcon>
                    </IconButton>
                </Tooltip>
            }
            {newGrade &&
                <AddGradeForm onSubmit= {addGradeForm}></AddGradeForm>
            } 
            
        </div>
        
    )
}

export default StructuralPage;