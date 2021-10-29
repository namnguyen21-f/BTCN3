import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React , {useState , useEffect} from 'react'
import './App.css'
import boardData from './data'
import Header from './components/Header';
import { Container } from '@mui/material';
import Classroom from './components/ClassroomList';
import PopUp from './components/Popup';
import axios from 'axios'

const api = "http://localhost:3000/api/";


function App() {
  const [isPopup, setisPopup] = useState(false)
  const [dataClass , setdataClass] = useState([])

  useEffect(() => {
    axios.get(api +  'class/getAll')
    .then(response => {
      setdataClass(response.data.data);
    });
  }, [])

  function onSubmitClassForm(data) {
    console.log(data)
    axios.post(api +  'class/new' , {teacher : data.teacher, className: data.className})
    .then(response => {
      setisPopup(false);
    });
  }

  return (
    <div className="App">
      {isPopup && <PopUp onSubmit={(data) => {onSubmitClassForm(data)}} onClose={() => {setisPopup(false)}}></PopUp>}
      <Header className={"[CLC]PTUDWNC - 18KTPM1"} onAddClassHandle={() => {setisPopup(true)}}></Header>
      <Container fixed>
        <Classroom title="Classroom List" list={dataClass}></Classroom>
      </Container>
    </div>
  );
}

export default App;
