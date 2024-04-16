import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logo from "../src/assets/logo19.jpg";
import Container from "react-bootstrap/Container";
import { FaFacebook, FaGoogle  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Login = () => {
    return ( 

        <div className="App">
        <Container style={{backgroundColor:"black"}} fluid>
          <h1 className="head p-3">Palit na!</h1>
          <h1 className="head2 p-3">Neighbor friendly Grocery Store</h1>
        </Container>
        <Row>
          <Col xs={7}>

            <div className="all">
         
           <div className="login">
               <h1 >LOG IN</h1>
               </div>
                <Form className="form mt-4">
                  
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="FormLabel">Email</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} type="email" placeholder="Username or Email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="FormLabel">Password</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3 FormLabel "  controlId="formBasicCheckbox">
                    <Form.Check  type="checkbox" label="Remember Password" />
                    
                  </Form.Group>
                  <Form.Label className="forgot">Forgot Password</Form.Label>
                  <Button className="submit mt-3" variant="danger" type="submit">
                    Submit
                  </Button>
                </Form>
                <p className="signup mt-4">Don't have account yet? <a href="#">Sign Up</a></p>
                <div className="icon">
                <FaGoogle className="icons google mx-2"/>
                <FaFacebook className="icons facebook mx-2"/>
                <FaXTwitter className="icons twitter mx-2"/>
                </div>
                

                </div>
              
          </Col>
          <Col>
          <Image src={logo} className="img mt-2 pt-4"/>
          </Col>
        </Row>

    </div>
     );
}
 
export default Login;