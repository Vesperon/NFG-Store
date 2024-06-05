import supabase from "./supabaseClient";
import { useEffect, useState } from "react";
import OwnerNavbar from "./OwnerNavbar";
import { Navbar, Row, Col, Image } from "react-bootstrap";
import SideBar from "./Sidebar";
import AboutLogo from "../src/assets/about.png";

const About = () => {
    const [userID, setUserID] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    
    useEffect(() => {
        UserID();
    }, []);
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    async function UserID(){
        let merchant_id;
        const { data: { user } } = await supabase.auth.getUser();
        let { data: merchant, error: merchError } = await supabase
            .from('merchant')
            .select('*');
        
        if (merchError) {
            console.log(merchError);
        } else {
            merchant.forEach(merch => {
                if (merch.uuid === user.id) {
                    merchant_id = merch.id;
                }
            });
            setUserID(merchant_id);
            console.log(userID);
        }
    }
    return ( 
        <div>
            { userID === 16 ? (
                <OwnerNavbar />
            ) : (
                <Navbar />
            )}
            <Row className="row">
                <Col className="col">
                   <SideBar />
                </Col>

                <Col xs={10} >
                    <Image src={AboutLogo} />
                </Col>
            </Row>
        </div>
     );
}
 
export default About;