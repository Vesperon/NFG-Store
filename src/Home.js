import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OwnerNavbar from "./OwnerNavbar";
import supabase from "./supabaseClient";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";

const Home = () => {
    const [userID, setUserID] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    
    useEffect(() => {
        UserID();
        fetchTopItems();
        fetchLowStockItems();  // Fetch low stock items when component mounts
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

    async function fetchTopItems() {
        let { data: topItems, error } = await supabase
            .from('product')
            .select('*')
            .order('product_sold', { ascending: false })
            .limit(5);
        
        if (error) {
            console.log(error);
        } else {
            setTopItems(topItems);
        }
    }

    async function fetchLowStockItems() {
        let { data: lowStockItems, error } = await supabase
            .from('product')
            .select('*')
            .order('product_quantity', { ascending: true }) // Order by stock in ascending order to get low stock items
            .limit(5); // Limit to top 5 low stock items
        
        if (error) {
            console.log(error);
        } else {
            setLowStockItems(lowStockItems);
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
                <h5 className="k">i</h5>
                <h1 className="headlines py-1 text-danger" >TOP HALINON</h1>
                <h1 className="date_right" >Date Today: {formattedDate}</h1>
                <h3 className="top mb-3">TOP 5 BEST SELLERS</h3>
                <Table className="px-5">
                    <thead>
                        <tr> 
                            <th className="custom-thead">ID</th>
                            <th className="custom-thead">PRODUCT</th>
                            <th className="custom-thead">CATEGORY</th>
                            <th className="custom-thead">PRICE</th>
                            <th className="custom-thead">UNIT</th>
                            <th className="custom-thead">ITEMS SOLD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.product_category}</td>
                                <td>{item.product_price}</td>
                                <td>{item.product_unit}</td>
                                <td>{item.product_sold}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button className="bar" variant="danger" ></Button>
                <h1 className="headlines py-1 text-danger" >TOP SUKI</h1>
                <h3 className="suki mb-3">TOP 5 LOW STOCK ITEMS</h3>
                <Table className="px-5 ">
                    <thead>
                        <tr> 
                            <th className="custom-thead">ID</th>
                            <th className="custom-thead">PRODUCT</th>
                            <th className="custom-thead">CATEGORY</th>
                            <th className="custom-thead">STOCK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.product_category}</td>
                                <td>{item.product_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </div>
    );
}

export default Home;
