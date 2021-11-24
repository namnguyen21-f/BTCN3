import React , {useState , useEffect} from 'react'
import { AccordionDetails, Container } from '@mui/material';
import axios from 'axios'
import api from '../uri';
import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Header from '../components/Header';
import AddClassForm from '../components/AddClassForm';
import ManageProfileForm from '../components/ManageProfileForm';
import PopUp from '../components/Popup';
import "../style/StructuralPage.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';




const AddStructGrade= ()=>{
    const { id } = useParams();
    const [cls , setCls] = useState(null);
    const [isPopup, setisPopup] = useState(false)
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

    function onDragEnd(result) {
        if (!result.destination) {
          return;
        }
        var itemgg = [...listGrade];
        const itemF = reorder(
          itemgg,
          result.source.index,
          result.destination.index
        );
        setListGrade(itemF);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };
  
    const gradeUI=()=>{
        return listGrade.map((grade, i)=>(
            <Draggable key={i} draggableId={i + 'id'} index={i}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div>
                        <div style={{marginBottom: "0px"}}>
                            <div style={{width:'100%', marginBottom: '0px' }}>
                                <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"300px"}} fontSize="small"/>
                            </div>

                            <div className="gradeBox">
                                <AccordionDetails className="addGrade">
                                <div className="addGradeTop">
                                    <input type="text" className="gradeText" placeholder="Name of component grade" value={grade.gradeText} onChange={e=>{changeGradeText(e.target.value, i)}}></input>
                                    <input type="number" className="grade" placeholder="Grade" value={grade.grade} onChange={e=>{changeGrade(e.target.value, i)}}></input>
                                </div>
                                </AccordionDetails>
                                <AddCircleOutlineIcon onClick={addMoreGrade} className="edit"/>
                            </div>


                        </div>
                    </div>
                </div>
                )}
                </Draggable>
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
            { cls &&
                <Header classId= {cls._id}
                    className={cls.className} 
                    onManageProfile = {() => {setisPopupProfile(true)}}
                    onAddClassHandle={() => {setisPopup(true)}}>
                </Header>}
            <Container fixed className= "form"> 
                <div className="section">
                  <div className="title_section">
                    <div className="form_top">
                      <input type="text" className="form_top_name" style={{color: "black"}} placeholder="Untitled Document"></input>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {gradeUI()}

                                {provided.placeholder}
                            </div>
                            )} 
                        </Droppable>
                    </DragDropContext>
                    {/* {gradeUI()} */}
                    <Button variant="contained" color="primary" onClick={saveForm} style={{fontSize:"14px", marginTop: "10px"}}>Save</Button>
                    
                  </div>
                </div>
              </Container>
        </div>
    )
}


export default AddStructGrade;