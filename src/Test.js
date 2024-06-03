import supabase from "./supabaseClient";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Card } from "react-bootstrap";
import { CartProvider } from "react-use-cart";

const Test = () => {
    let merchant_id;
    let image;
    const [fileName, setFileName] = useState("Upload Boundary File");
    const testSubmit = async (e) =>{
        e.preventDefault();


        console.log(fileName);
        
        // ============== Create an Inventory ==============
        // const { data: { user } } = await supabase.auth.getUser();

        // let { data: merchant, error:merchError } = await supabase
        // .from('merchant')
        // .select('*');
  
        // merchant.forEach(merch => {
        //   if(merch.uuid === user.id)
        //   {
        //     console.log(merch.uuid);
        //     merchant_id = merch.id;
        //     console.log(merchant_id);
        //   }
        // });


        
        // const { data, error } = await supabase
        // .from('inventory')
        // .insert([
        // { user_id: merchant_id}
        // ])
        // .select();
        // ============== Create an Inventory ==============

        // ============== Fetch All Product ==============
        // const { data: { user } } = await supabase.auth.getUser();

        // let { data: merchant, error:merchError } = await supabase
        // .from('merchant')
        // .select('*');
  
        // merchant.forEach(merch => {
        //   if(merch.uuid === user.id)
        //   {
        //     console.log(merch.uuid);
        //     merchant_id = merch.id;
        //     console.log(merchant_id);
        //   }
        // });

        // let { data: product, error } = await supabase
        // .from('product')
        // .select('*')
        // .eq('user_id', merchant_id );

        // console.log(product);
        // ============== Fetch All Product ==============
       

    }


    return ( 

    <>
        {/* <Form onSubmit={testSubmit}>
        <Form.Group className="my-1">
            <Form.Label className="FormLabel">Product Unit</Form.Label>
            <Form.Control
            style={{
                backgroundColor: "white",
                border: "2px solid black",
                color: "black",
            }}
            type="file"
            accept="image/*"
            onChange={(e) => setFileName(e.target.files[0].path)}
            
            />
            </Form.Group>
            <Button type="submit"> Test </Button>
        </Form> */}
        


    </>
        
     );
}
 
export default Test;