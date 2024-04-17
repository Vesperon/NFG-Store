import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const History = () => {
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
          
            <h1 className="date" >Date Today: 14/04/2024</h1>
            <h1 className="recently" >Recently</h1>
            <Table className="px-5 mt-1">
                <thead>
                    <tr > 
                        <th className="custom-thead">DATE</th>
                        <th className="custom-thead">CUSTOMER ID</th>
                        <th className="custom-thead">NAME</th>
                        <th className="custom-thead">AMOUNT</th>
                   
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th className="pt-3">17/04/2024</th>
                        <th className="pt-3">001</th>
                        <th className="pt-3">uwu</th>
                        <th className="pt-3">uwu</th>
                    </tr>
                </tbody>
            </Table>
           
           
            </Col>
        </Row>

    </div>
     );
}
 
export default History;