import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './pages/HomePage'
import './App.css'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios'
import React, {useEffect} from 'react'
import api from './uri';
import ClassDetail from './pages/ClassDetail';



function App() {

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
        }else{
          if (pn !== "/login" &&  pn !== "/signup"){
            window.location.href = "/login";
          }
        }
      })
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} /> 
        <Route exact path="/signup" component={SignupPage}/> 

        <Route exact path="/login" component={LoginPage}/> 
        <Route exact path="/classDetail" component={ClassDetail}/>
      </div>
    </Router>
  );
}

export default App;
