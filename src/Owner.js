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

const Owner = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    async function logout() {
        
        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error.message)
        }
        window.location.href="/";

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
                        <tr>
                        <h1 className="owner mt-5">Username: admin</h1>
                        </tr>
                        <tr>
                        <h1 className="owner mt-2">Store Name: Neighbor Friendly Grocery Store</h1>    
                        </tr>
                        <tr>
                        <h1 className="owner mt-2">Email: admin@gmail.com</h1>    
                        </tr>
                        <tr>
        <Button className="owner mt-2 bg-danger" style={{marginLeft: "19px", width:"100px", border:"none", color:"white"}} onClick={()=> logout()} > Logout </Button> 
                        </tr>
                    </tbody>
                </Table>
                </Col>

            </Row>
            <br></br>
            <br></br>
            <Container className="border-top">
            <h1 style={{
                fontWeight:"300", 
                float:"left",  
                fontSize:"smaller",
                fontStyle: "normal",
                marginLeft:"20px",
                marginTop:"50px"
                }}>Monthly Total Revenue</h1>
            
            <Table className="px-5">
                <thead>
                    <tr > 
                        <th className="custom-thead">MONTH</th>
                        <th className="custom-thead">TOTAL CAPITAL</th>
                        <th className="custom-thead">TOTAL SALES</th>
                        <th className="custom-thead">TOTAL PROFIT</th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>000</th>
                        <th>000</th>
                        <th>000</th>
                        <th>000 </th>
                    </tr>
                </tbody>
            </Table>
            </Container>
            </Col>
            
        </Row>
        
        
    </div>


     );
}
 
export default Owner;