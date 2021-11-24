import React , {useState , useEffect} from 'react'
import Header from '../components/Header';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';
import { AccordionDetails, Container } from '@mui/material';
import PopUp from '../components/Popup';

import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../uri';
import "../style/StructuralPage.css"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';



import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AddGradeForm from '../components/AddGradeForm';
import GradeList from '../components/GradeList';



const StructuralPage= ()=>{
    const { id } = useParams();
    const [cls , setCls] = useState(null);
    const [isPopup, setisPopup] = useState(false)
    const [isAddass, setisAddass] = useState(true)
    const [isPopupProfile, setisPopupProfile] = useState(false)
    const [listGrade, setListGrade]= useState([{
      gradeText: "",
      grade: ""
    }]);

    useEffect(() => {
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
            let cls= response.data;
            setCls(cls);
        });
    }, []);

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

    const changeGradeText= (gradeText, i)=>{
      let newGrade= [...listGrade];
      newGrade[i].gradeText= gradeText;
      setListGrade(newGrade);
    }

    const changeGrade= (grade, i)=>{
      let newGrade= [...listGrade];
      newGrade[i].grade= grade;
      setListGrade(newGrade);
    }

    const addMoreGrade= ()=>{
      setListGrade([...listGrade, {gradeText: "", grade: ""}]);
    }

    const gradeUI=()=>{
      return listGrade.map((grade, i)=>(
        <div className="gradeBox">
          <AccordionDetails className="addGrade">
            <div className="addGradeTop">
              <input type="text" className="gradeText" placeholder="Name of component grade" value={grade.gradeText} onChange={e=>{changeGradeText(e.target.value, i)}}></input>
              <input type="number" className="grade" placeholder="Grade" value={grade.grade} onChange={e=>{changeGrade(e.target.value, i)}}></input>
            </div>
          </AccordionDetails>
          <AddCircleOutlineIcon onClick={addMoreGrade} className="edit"/>
        </div>
      ))
    }

    const saveForm= ()=>{
      axios.post(api+ `class/${id}/newAssignment`, {fieldArray: listGrade, name: cls.className},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
        })
        .then(response=>{
          console.log(response);
          alert("Successful");
        })
        .catch(err => {
          if (err.response.data.message === "Student does not have permisson"){
            alert("Student does not have permisson") 
          }else {
            alert("Something wrong") 
          }
        });
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
                <Header classId= {cls._id}
                    className={cls.className} 
                    onManageProfile = {() => {setisPopupProfile(true)}}
                    onAddClassHandle={() => {setisPopup(true)}}>
                </Header>}
              
              {/* {showGrade &&
                <GradeList title = "Grade of Course" list = {listGrade}></GradeList>
              } */}
              {cls && 
                <Container fixed>
                  <GradeList title = "Assignment List" assList={cls.assignmentList}></GradeList>
                </Container>
              }

              <Container fixed className= "form"> 
                <div className="section">
                  <div className="title_section">
                    <div className="form_top">
                      <input type="text" className="form_top_name" style={{color: "black"}} placeholder="Untitled Document"></input>
                    </div>
                  </div>
                </div>
                {gradeUI()}
                <Button variant="contained" color="primary" onClick={saveForm} style={{fontSize:"14px"}}>Save</Button>
              </Container>
              
            
        </div>
        
    )
}

export default StructuralPage;