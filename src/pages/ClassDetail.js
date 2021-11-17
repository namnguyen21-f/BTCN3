import { Fragment } from 'react';
import Header from '../components/Header';
import SendEmail from '../components/SendEmail';
import { Container } from '@mui/material';


const ClassDetail= ({cls})=>{
    return(
        <div className="App">
            <Header flex justifyContent={"center"}></Header>
            <Container fixed> 
                <SendEmail classId= {cls}></SendEmail>
            </Container>
        </div>
        
    )
}

export default ClassDetail;