import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logo from "../src/assets/logo19.jpg";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import supabase from "./supabaseClient";
import Inventory from "./Inventory";




const Signup = () => {

  const [username, setUsername] = useState('');
  const [storename, setStorename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  let merchant_id;

  // const form_register = document.getElementById("form_register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password !== confirmpassword)
    {
      alert("Password and Confirm Password is not identical");
      return;
    }
  
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(data);
    console.log(password);

    console.log(data.user);
   
    if(!error)
    {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
      .from('merchant')
      .insert([
        { 
          username: username, 
          store_name: storename,
          uuid: user.id
        },
      ])
      .select();

      let { data: merchant, error:merchError } = await supabase
      .from('merchant')
      .select('*');

      merchant.forEach(merch => {
        if(merch.uuid === user.id)
        {
          console.log(merch.uuid);
          merchant_id = merch.id;
          console.log(merchant_id);
        }
      });


      
      const { data:inventory, error:inventoryError } = await supabase
      .from('inventory')
      .insert([
      { user_id: merchant_id}
      ])
      .select();
     


      console.log(data);
      window.location.href="/";
      if(error)
      {
        console.log(error);
      }
      else{
        
      }

      
    }
    else
    {
      
      alert(error);
    }

    
    


  }


   

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
                <Form className="form mt-4" onSubmit={handleSubmit} action="/">
                  
                  <Form.Group className="mb-2" controlId="formBasicUsername">
                    <Form.Label className="FormLabel">Username</Form.Label>
                      <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                      type="text" 
                      name="username"
          
                      placeholder="Enter Username" 
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicStoreName">
                    <Form.Label className="FormLabel">Store Name</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="text" 
                    placeholder="Enter Store Name" 
                    onChange={(e) => setStorename(e.target.value)}
                    value={storename}
                    name="storename"
                 
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label className="FormLabel">Email</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="email" 
                    name="email"
              
                    placeholder="Enter Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="FormLabel">Password</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="password" 
                    name="password"
                    placeholder=" Enter Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
                    <Form.Label className="FormLabel">Confirm Password</Form.Label>
                    <Form.Control style={{backgroundColor: "white", border: "2px solid black", color: "black"}} 
                    type="password" 
                    name="confirmpassword"
       
                    placeholder=" Enter Confirm Password" 
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    value={confirmpassword}
                    className="formControl"/>
                  </Form.Group>

                  <Form.Group className="my-1 FormLabel "  controlId="formBasicCheckbox" style={{marginLeft:"80px"}}>
                    <Form.Check  type="checkbox" label="I agree all terms, privacy, and conditions." />
                  </Form.Group>
                 
                  <Button className="submit my-1" variant="danger" type="submit" style={{marginLeft:"160px"}}>
                    Submit
                  </Button>
                  <p className="mt-1" style={{marginLeft:"30px"}}>Already have an account? <a href="/">Login</a></p>
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