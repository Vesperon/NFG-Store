
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import  Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from "./supabaseClient";
import { MdDelete } from "react-icons/md";

const Inventory = () => {
    const [modalShow, setModalShow] = useState(false);
    const [products,setProducts] = useState([]);
    useEffect(() => {
        fetchProduct();
    },);

    async function fetchProduct()
    {
        let merchant_id;
        const { data: { user } } = await supabase.auth.getUser();

                let { data: merchant, error:merchError } = await supabase
                .from('merchant')
                .select('*');
        
                merchant.forEach(merch => {
                if(merch.uuid === user.id)
                {
                    merchant_id = merch.id;
                }
                });

                let { data: product, error } = await supabase
                .from('product')
                .select('*')
                .eq('user_id', merchant_id );
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
            <h1 className="side py-1">Settings</h1>
            <h1 className="side py-1">Account</h1>
            <h1 className="side py-1">About</h1>
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

          <Col xs={10}>
            <h1 className="date py-1">Date Today: 14/04/2024</h1>
            <Button
              className="addProduct"
              onClick={() => setModalShow(true)}
            >
              Add Product
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <Table className="px-5">
              <thead>
                <tr>
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
                {products.map((product) =>(
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <th>{product.product_name}</th>
                  <th>{product.product_brand}</th>
                  <th>{product.product_category}</th>
                  <th>{product.product_price}</th>
                  <th>{product.product_quantity}</th>
                  <th>{product.product_unit}</th>
                  <th>
                    <Button className="bg-dark mx-1 border-dark">-</Button>
                    <Button className="bg-dark mx-1 border-dark">+</Button>
                    <Button className="bg-danger border-danger mx-1">
                      <MdDelete />
                    </Button>
                  </th>
                </tr>

                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );


}
function MyVerticallyCenteredModal(props) {
    const [productName,setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productUnit, setProductUnit] = useState('');
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let merchant_id;
        let prod_id;
        const { data: { user } } = await supabase.auth.getUser();

         let { data: merchant, error:merchError } = await supabase
        .from('merchant')
        .select('*');
  
        merchant.forEach(merch => {
          if(merch.uuid === user.id)
          {
            merchant_id = merch.id;
          }
        });

        const { data: product, error: errorProduct } = await supabase
        .from('product')
        .insert([
        { product_name: productName,
          product_brand: productBrand ,
          product_category: productCategory ,
          product_quantity: productQuantity,
          product_price: productPrice ,
          product_unit: productUnit,
          user_id: merchant_id
        }
        ])
        .select();
        
        if(errorProduct)
        {alert(errorProduct)}
        else{
            console.log(product);
        }
        
       

        
       
        


    
    }
 

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form mt-1" onSubmit={handleSubmit}>
            <Form.Group className="mb-1">
              <Form.Label className="FormLabel">Product Name</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="text"
                placeholder="Enter Product Name"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </Form.Group>

            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Brand</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="text"
                placeholder="Enter Product Brand"
                onChange={(e) => setProductBrand(e.target.value)}
                value={productBrand}
              />
            </Form.Group>
            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Category</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="text"
                placeholder="Enter Product Category"
                onChange={(e) => setProductCategory(e.target.value)}
                value={productCategory}
              />
            </Form.Group>

            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Quantity</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="number"
                placeholder="Enter Product Quantity"
                onChange={(e) => setProductQuantity(e.target.value)}
                value={productQuantity}
              />
            </Form.Group>

            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Price</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="number"
                placeholder="Enter Product Price"
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
              />
            </Form.Group>

            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Unit</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="text"
                placeholder="Enter Product Price"
                onChange={(e) => setProductUnit(e.target.value)}
                value={productUnit}
              />
            </Form.Group>

            <Button 
              
              onClick={props.onHide}
              variant="primary"
              style={{
                float:"left",
                marginTop:"8px"
              }}
            >
            Cancel
            </Button>
            <Button
              
              variant="primary"
              type="submit"
              formAction="/inventory"
              style={{
                float: "right",
                marginTop:"10px"
             
              }}
            >
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
export default Inventory;