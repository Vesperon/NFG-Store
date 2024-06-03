import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SidebarMerchant from "./SidebarMerchant";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import supabase from "./supabaseClient";
import { useCart } from "react-use-cart";
import ItemCard from "./ItemCard";


const Shop = () => {
    const {addItem} = useCart();
    const [cart, setCart] = useState([]);
    const today = new Date();
    const CDNURL = "https://nrtujxglikuaeykrmczf.supabase.co/storage/v1/object/public/product/";
    const formattedDate = today.toISOString().split('T')[0];
    const [products, setProducts] = useState([]);
    const [images, setImages ] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() =>{
        fetchProduct();
        // testAddItem();
    },);

    async function testAddItem(){
        console.log(addItem);
    }
    async function fetchProduct()
    {
        let merchant_id;
        const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
                
                let { data: product, error } = await supabase
                .from('product')
                .select('*')
                .eq('user_id', 16 );
                if(error)
                {
                    console.log(error);
                }
                else{
                    setProducts(product);
                }
                
    }

    return ( 
        <div>
        <Navbar />
        <Row className="row">
            <Col className="col">
                <SidebarMerchant />
            </Col>
            <Col xs={10} >
            <h1 className="date_right py-1">Date Today: {formattedDate}</h1>
                <Container>
                    <Row className="cardShop">
                    {products.map((products) =>(
                      <ItemCard index={products.id} product={products} />          
                    ))}
                    </Row>
                </Container>
            </Col>
        </Row>

        
    </div>

     );
}
 
export default Shop;