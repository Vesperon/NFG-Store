import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Logo from "../src/assets/default_profile.png";
import SideBar from "./Sidebar";
import supabase from "./supabaseClient";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const Owner = () => {
    const [userID, setUserID] = useState([]);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    useEffect(()=>{
        fetchID();
    },[])


    async function logout() {
        
        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error.message)
        }
        window.location.href="/";

    }

    async function fetchID(){
        const { data: { user } } = await supabase.auth.getUser();
        let { data: merchant, error } = await supabase
        .from('merchant')
        .select('*')
        .eq('uuid', user.id);
        setUserID(merchant);
        console.log(merchant);
        console.log(userID);
    }
    return ( 

        <div>
        <Navbar />
        <Row className="row">
            <Col className="col">
                <SideBar />
            </Col>

            <Col xs={10} >
 
            <h1 style={{
                fontWeight:"300", 
                float:"right",  
                fontSize:"smaller",
                fontStyle: "normal",
                marginRight:"20px"
                }}>Date Today: {formattedDate}</h1>
            <br></br>
            <Row>
                <Col>
                <Image src={Logo} className="img mt-2 pt-4 mx-5" style={{float:"left"}} />
                <br></br>
                <br></br>
                </Col>
                <Col xs={8}>
                <Table>
                    <tbody>
                        {userID.map((item,index) =>(
                            <div key={index}>
                                <tr>
                            <h1 className="owner mt-5">Username: {item.username}</h1>
                        </tr>
                            <tr>
                            <h1 className="owner mt-2">Store Name: {item.store_name}</h1>    
                            </tr>
                            </div>
                        
                       
                        ))}
                         <tr>
        <Button className="owner mt-5 bg-danger" style={{marginLeft: "19px", width:"100px", border:"none", color:"white"}} onClick={()=> logout()} > Logout </Button> 
                        </tr>
                    </tbody>
                </Table>
                </Col>

            </Row>
            </Col>
            
        </Row>
        
        
    </div>


     );
}
 
export default Owner;