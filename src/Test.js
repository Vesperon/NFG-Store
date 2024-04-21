import supabase from "./supabaseClient";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Test = () => {
    let merchant_id;
    const testSubmit = async (e) =>{
        e.preventDefault();

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
        <Form onSubmit={testSubmit}>

            <Button type="submit"> Test </Button>
        </Form>
        


    </>
        
     );
}
 
export default Test;