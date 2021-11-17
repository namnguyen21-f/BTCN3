import { Fragment } from 'react';
import Header from '../components/Header';
import SendEmail from '../components/SendEmail';
import { Container } from '@mui/material';
import React , {useState , useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../uri';
import ShowListTS from '../components/ShowListTS';

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
            {cls && <Header flex justifyContent={"center"} className={cls.className}></Header>}
            {cls && <Container fixed> 
                <SendEmail classId= {cls._id}></SendEmail>
                <ShowListTS classId= {cls._id}></ShowListTS>
            </Container>}
        </div>
        
    )
}

export default ClassDetail;