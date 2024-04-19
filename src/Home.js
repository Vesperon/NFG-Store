import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Home = () => {
    return ( 
        <div>
        <Navbar />
        <Row className="row">
            <Col className="col">
            <h1 className="side py-1" >Settings</h1>
            <h1 className="side py-1" >Account</h1>
            <h1 className="side py-1" >About</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </Col>

            <Col xs={10} >
            <Button className="bar" variant="danger" ></Button>
            <h1 className="headlines py-1 text-danger" >TOP HALINON</h1>
            <h1 className="date" >Date Today: 14/04/2024</h1>
            <h3 className="top mb-3">TOP 5 BEST SELLERS</h3>
            <Table className="px-5">
                <thead>
                    <tr > 
                        <th className="custom-thead">ID</th>
                        <th className="custom-thead">PRODUCT</th>
                        <th className="custom-thead">BRAND</th>
                        <th className="custom-thead">CATEGORY</th>
                        <th className="custom-thead">QUANTITY</th>
                        <th className="custom-thead">PRICE</th>
                        <th className="custom-thead">UNIT</th>
                     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th >ID</th>
                        <th>111</th>
                        <th>Baoma</th>
                        <th>Katol</th>
                        <th>13</th>
                        <th>10.00</th>
                        <th>Box</th>
                
                    </tr>
                </tbody>
            </Table>
            <Button className="bar" variant="danger" ></Button>
            <h1 className="headlines py-1 text-danger" >TOP SUKI</h1>
            <h3 className="suki mb-3">TOP 5 CUSTOMERS</h3>
           
            <Table className="px-5 ">
                <thead>
                    <tr > 
                        <th className="custom-thead">ID</th>
                        <th className="custom-thead">USERNAME</th>
                        <th className="custom-thead">STORE NAME</th>
                        <th className="custom-thead">TOTAL AMOUNT</th>
                     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th >ID</th>
                        <th>111</th>
                        <th>Baoma</th>
                        <th>Katol</th>
                       
                
                    </tr>
                </tbody>
            </Table>
            
           
            </Col>
        </Row>

        
    </div>

     );
}
 
export default Home;