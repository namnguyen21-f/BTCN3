import React , {useState , useEffect, Fragment} from 'react'
import Header from '../components/Header';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';
import SendEmail from '../components/SendEmail';
import { Container } from '@mui/material';
import PopUp from '../components/Popup';

import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../uri';
import ShowListTS from '../components/ShowListTS';



const ClassDetail= ({user})=>{
    const { id } = useParams();
    const [cls , setCls] = useState(null);
    const [isPopup, setisPopup] = useState(false)
    const [isPopupProfile, setisPopupProfile] = useState(false)
    
    useEffect(() => {
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
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


    return(
        <div className="App"> 
            {isPopup && 
                <PopUp onClose={() => {setisPopup(false)}}>
                    <AddClassForm onSubmit={onSubmitClassForm}></AddClassForm> 
                </PopUp>}
            {isPopupProfile && 
                <PopUp onClose={() => {setisPopupProfile(false)}}>
                    <ManageProfileForm onSubmit={onSubmitProfileForm}></ManageProfileForm>
                </PopUp>}
            {cls && 
                <Header classId= {cls._id}
                    className={cls.className} 
                    onManageProfile = {() => {setisPopupProfile(true)}}
                    onAddClassHandle={() => {setisPopup(true)}}
                    role={user.role}>
                </Header>}
            {cls && <Container fixed> 
                
                <SendEmail classId= {cls._id}></SendEmail>
                <ShowListTS classId= {cls._id}></ShowListTS>
            </Container>}
        </div>
        
    )
}

export default ClassDetail;