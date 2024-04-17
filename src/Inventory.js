import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
const Inventory = () => {
    
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
                <h1 className="date py-1" >Date Today: 14/04/2024</h1>
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
                            <th className="custom-thead"> </th>
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
                            <th><Button className="bg-dark mx-1 border-dark">-</Button><Button className="bg-dark mx-1 border-dark">+</Button><Button className="bg-danger border-danger mx-1"><MdDelete /></Button>  </th>
                        </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>

        </div>
     );
}
 
export default Inventory;