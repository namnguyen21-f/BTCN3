import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage'
import './App.css'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios'
import React, {useEffect , useState} from 'react'
import api from './uri';
import ClassDetail from './pages/ClassDetail';
import  { Redirect } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import StructuralPage from './pages/StructuralPage';
import AddStructGrade from './pages/AddStructGrade';
import GradeTable from './pages/GradeTable'
import GradeStudent from './pages/GradeStudent'


function DecodeLink(){

  const { id , classId } = useParams();
  useEffect(() => {
    axios.get(api +  `class/${classId}/invite/${id}` , {}
    )
    .then(response => {
      
      alert(response.data.message + " You are in the class");
      window.location.href = "/" + classId + "/classDetail";
    })
  },[])
  return <p></p>
}

function DecodeUrlLink(){
  const { classId } = useParams();
  useEffect(() => {
    axios.get(api +  `class/${classId}/inviteUrl` ,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
    }
    )
    .then(response => {
      alert(response.data.message + " You are in the class");
      window.location.href = "/" + classId + "/classDetail";
    })
    .catch(err=> {
      alert("error: " + err.response.data.message);
      window.location.href = "/login";
      });
  },[])
  return <p></p>
}

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('Authorization') === null && window.location.pathname == "/"){
      window.location.href = "/login";
    }else{
      axios.post(api +  'atc' , {},  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        },
      })
      .then(response => {
        const pn = window.location.pathname;
        let message = response.data.message;
        
        if (message == "Token validated"){
          if (pn === "/login" || pn === "/signup"){
            window.location.href = "/";
          }
          setUser(response.data.user);
          setLoading(false);
        }else{
          if (pn !== "/login" &&  pn !== "/signup"){
            window.location.href = "/login";
          }
        }
      })
    }
  }, [localStorage.getItem('Authorization')])

  return (
    <Router>
      <div className="App">
        <Route exact path="/signup" component={SignupPage}/> 
        <Route exact path="/login" component={LoginPage}/> 
        {!loading && 
          <Route 
            exact 
            path="/" 
            render={() => (
              <HomePage user={user} authed={true} />
            )} /> }
        
        <Route exact path="/:id/classDetail" component={ClassDetail}/>
       
        <Route path="/class/:classId/invite/:id" component={DecodeLink}/>
        <Route path="/class/:classId/inviteUrl" component={DecodeUrlLink}/>
        <Route exact path="/:id/assignment/:assId" render={() => (
           <StructuralPage user={user} />
        )} />
        <Route exact path="/:id/assignment" render={() => (
          <StructuralPage user={user} authed={true} />
        )} />
        
        <Route exact path="/:id/structGrade" component={AddStructGrade}/>
        <Route exact path="/:id/gradeTable" component={GradeTable}/>
        <Route exact path="/:id/grade" component={GradeStudent}/>
      </div> 
    </Router>
  );
}

export default App;
