import Header from '../components/Header';

const ClassDetail= ({cls})=>{
    <Header flex justifyContent={"center"} className={cls.className}>
        <h3>Stream</h3>
        <h3>Classwork</h3>
    </Header>
}

export default ClassDetail;