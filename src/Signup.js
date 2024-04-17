import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logo from "../src/assets/logo19.jpg";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { supabase } from "./supabaseClient";




const Signup = () => {

  const [formData, setFormData] = useState([
    username,
    storename,
    email,
    password,
    confirmpassword
    
  ])



    return ( 
        <div className="App">
        <Container style={{backgroundColor:"black"}} fluid>
          <h1 className="head p-3">Palit na!</h1>
          <h1 className="head2 p-3">Neighbor friendly Grocery Store</h1>
        </Container>
        <Row>
          <Col xs={7}>

            <div className="all mt-3">
         
           <div className="login">
               <h1>SIGN UP</h1>
               </div>
                <Form className="form mt-4">
                  
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="FormLabel">Username</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="text" 
                    name="username"
                    placeholder="Enter Username" 
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="FormLabel">Store Name</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="text" 
                    placeholder="Enter Store Name" 
                    name="storename"
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="FormLabel">Email</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="email" 
                    name="email"
                    placeholder="Enter Email" 
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="FormLabel">Password</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="password" 
                    name="password"
                    placeholder=" Enter Password" 
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="FormLabel">Confirm Password</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="password" 
                    name="confirmpassword"
                    placeholder=" Enter Confirm Password" 
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="my-1 FormLabel "  controlId="formBasicCheckbox" style={{marginLeft:"80px"}}>
                    <Form.Check  type="checkbox" label="I agree all terms, privacy, and conditions." />
                  </Form.Group>
                 
                  <Button className="submit my-1" variant="danger" type="submit" style={{marginLeft:"160px"}}>
                    Submit
                  </Button>
                  <p className="mt-1" style={{marginLeft:"30px"}}>Already have an account? <a href="#">Login</a></p>
                </Form>
               
                </div>
              
          </Col>
          <Col>
          <Image src={logo} className="img mt-2 pt-4"/>
          </Col>
        </Row>

    </div>


     );
}
 
export default Signup;