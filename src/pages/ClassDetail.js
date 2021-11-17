import { Fragment } from 'react';
import Header from '../components/Header';
import SendEmail from '../components/SendEmail';
import { Container } from '@mui/material';
import React , {useState , useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../uri';

const ClassDetail= ()=>{
    const { id } = useParams();
    const [cls , setCls] = useState(null);
    
    useEffect(() => {
        axios.get(api+ `class/${id}/classDetail`)
        .then(response=>{
            let cls= response.data;
            setCls(cls);
          
        });
        
    }, [])

    return(
        <div className="App">
            <Header flex justifyContent={"center"}></Header>
            {cls && <Container fixed> 
                <SendEmail classId= {cls._id}></SendEmail>
            </Container>}
        </div>
        
    )
}

export default ClassDetail;