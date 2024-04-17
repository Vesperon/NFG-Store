import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../src/assets/logo19.jpg";
import Image from "react-bootstrap/Image";

const Navigation = () => {
    return ( 
        <div>
            <Container fluid style={{backgroundColor:"black"}}>
            <h1 className="header p-3" >Palit na aron makabarato ka! 30% off on selected items!</h1>
            </Container>
            <Navbar fluid className='navcon' >
                <Container >
                    <Navbar.Brand href="#home" className="brandLabel">OWNER</Navbar.Brand>
                    <Nav className="mx-auto ">
                        <Nav.Link href="#home" className="mx-2 "  >Home</Nav.Link>
                        <Nav.Link href="#features" className="mx-2">Inventory</Nav.Link>
                        <Nav.Link href="#pricing" className="mx-2">Orders</Nav.Link>
                        <Nav.Link href="#pricing" className="mx-2">History</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br></br>
        </div>
    );
}
 
export default Navigation;
