import React , {useState , useEffect} from 'react'
import Header from '../components/Header';
import { Container } from '@mui/material';
import Classroom from '../components/ClassroomList';
import PopUp from '../components/Popup';
import axios from 'axios'
import api from '../uri';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';
import AccountManage from '../components/AccountManage';
import ClassManage from '../components/ClassManage';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: ".5rem 2rem",
    borderBottom: "1px solid black",
    position: "relative",
  },
  mainSection: {
    paddingTop: "2rem",
  },
  pt2: {
    paddingTop: "2rem",
  },
});


function HomePage({user}) {
  const classes = useStyles();
  const [isPopup, setisPopup] = useState(false)
  const [isPopupProfile, setisPopupProfile] = useState(false)
  const [dataClass , setdataClass] = useState([])
  const [dataAccount , setdataAccount] = useState([])
  

  useEffect(() => {
    if (user.role == "admin"){
      axios.get(api +  'admin/getAllAccount' , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
      })
      .then(response => {
        setdataAccount(response.data.data);
      }); 
    }
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
        <PopUp onClose={() => {setisPopup(false)}}>
          <AddClassForm onSubmit={onSubmitClassForm}></AddClassForm>
        </PopUp>}
      {isPopupProfile && 
        <PopUp onClose={() => {setisPopupProfile(false)}}>
          <ManageProfileForm onSubmit={onSubmitProfileForm}></ManageProfileForm>
        </PopUp>}
      <Header
        onManageProfile = {() => {setisPopupProfile(true)}}
        onAddClassHandle={() => {setisPopup(true)}}
      
        clsName={user.role == "admin" ? "AdminPage" : "HomePage"}
        ></Header>

      {user.role != "admin" && 
        <Container className={classes.mainSection} fixed>
          <Classroom title="Classroom List" list={dataClass}></Classroom>
        </Container>
      }

      {user.role == "admin" && 
        <Container className={classes.mainSection} fixed>
          <div>
            {dataAccount.length!=0 && <AccountManage accData={dataAccount}></AccountManage>}
          </div>
          <div className={classes.pt2}>
            {dataClass.length !=0 && <ClassManage accData={dataClass}></ClassManage>}
          </div>
        </Container>
      }
    </div>
  );
}

export default HomePage;