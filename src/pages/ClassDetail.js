import Header from '../components/Header';
import SendEmail from '../components/SendEmail';



const ClassDetail= ({cls})=>{
    return(
        <Header flex justifyContent={"center"}>
            <SendEmail classId= {cls}></SendEmail>
        </Header>
    )
}

export default ClassDetail;