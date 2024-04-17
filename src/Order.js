import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const Order = () => {
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
            <Table className="px-5 mt-5">
                <thead>
                    <tr > 
                        <th className="custom-thead">ID</th>
                        <th className="custom-thead">PRODUCT</th>
                        <th className="custom-thead">BRAND</th>
                        <th className="custom-thead">CATEGORY</th>
                        <th className="custom-thead">QUANTITY</th>
                        <th className="custom-thead">PRICE</th>
                        <th className="custom-thead">UNIT</th>
                        <th className="custom-thead">Confirm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th className="pt-3">ID</th>
                        <th className="pt-3">111</th>
                        <th className="pt-3">Baoma</th>
                        <th className="pt-3">Katol</th>
                        <th className="pt-3">13</th>
                        <th className="pt-3">10.00</th>
                        <th className="pt-3">Box</th>
                        <th><Button className="confirm mx-1 ">Accept</Button><Button className="confirm mx-1 bg-danger border-danger" >Decline</Button></th>
                    </tr>
                </tbody>
            </Table>
           
           
            </Col>
        </Row>

    </div>
     );
}
 
export default Order;