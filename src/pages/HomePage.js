import React , {useState , useEffect} from 'react'
import Header from '../components/Header';
import { Container } from '@mui/material';
import Classroom from '../components/ClassroomList';
import PopUp from '../components/Popup';
import axios from 'axios'
import api from '../uri';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';

function HomePage() {
  const [isPopup, setisPopup] = useState(false)
  const [isPopupProfile, setisPopupProfile] = useState(false)
  const [dataClass , setdataClass] = useState([])

  useEffect(() => {
    axios.get(api +  'class/getAll')
    .then(response => {
      setdataClass(response.data.data);
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

  return (
    <div className="App">
      {isPopup && 
        <PopUp onSubmit={(data) => {onSubmitClassForm(data)}} onClose={() => {setisPopup(false)}}>
          <AddClassForm onSubmit={onSubmitClassForm}></AddClassForm>
        </PopUp>}
      {isPopupProfile && 
        <PopUp onSubmit={(data) => {onSubmitClassForm(data)}} onClose={() => {setisPopupProfile(false)}}>
          <ManageProfileForm onSubmit={onSubmitProfileForm}></ManageProfileForm>
        </PopUp>}
      <Header className={"[CLC]PTUDWNC - 18KTPM1"} 
        onManageProfile = {() => {setisPopupProfile(true)}}
        onAddClassHandle={() => {setisPopup(true)}}></Header>
      <Container fixed>
        <Classroom title="Classroom List" list={dataClass}></Classroom>
      </Container>
    </div>
  );
}

export default HomePage;