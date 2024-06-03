
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
import { FaEdit } from "react-icons/fa";

const Inventory = () => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [quantityModalShow, setQuantityModelShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [products,setProducts] = useState([]);
    const [selectedProdID, setSelectedProdID] = useState(null);
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
                if(merchError)
                  console.log(merchError);

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

    async function deleteProduct(productId) {
      const { data, error } = await supabase
          .from('product')
          .delete()
          .eq('id', productId);
      if (error) {
          console.log(error);
      } else {
          console.log("Deleted Product:" + data);
          setProducts(products.filter(product => product.id !== productId));
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
                    <Button className="bg-dark mx-1 border-dark" onClick={() => {setEditModalShow(true); setSelectedProdID(product.id); }}><FaEdit /></Button>
                    <EditProductModal 
                      show={editModalShow}
                      onHide={() => setEditModalShow(false)}
                      productID = {selectedProdID}
                    />
                    <Button className="bg-dark mx-1 border-dark" onClick={() => {setQuantityModelShow(true); setSelectedProdID(product.id); }}>+</Button>
                    <EditQuantityModal 
                      show={quantityModalShow}
                      onHide={() => setQuantityModelShow(false)}
                      productId = {selectedProdID}
                    />
                    <Button className="bg-danger border-danger mx-1" onClick={() => deleteProduct(product.id)}>
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

function EditProductModal(props)
{
    const [productName,setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productUnit, setProductUnit] = useState('');
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const { productId } = props;
      let merchant_id;
      const { data: { user } } = await supabase.auth.getUser();

       let { data: merchant, error:merchError } = await supabase
      .from('merchant')
      .select('*');

      if(merchError)
        console.log(merchError);

      merchant.forEach(merch => {
        if(merch.uuid === user.id)
        {
          merchant_id = merch.id;
        }
      });

      const { data: product, error: errorProduct } = await supabase
      .from('product')
      .update([
      { product_name: productName,
        product_brand: productBrand ,
        product_category: productCategory ,
        product_quantity: productQuantity,
        product_price: productPrice ,
        product_unit: productUnit,
      }
      ])
      .eq('id', productId )
      .select();
      
      if(errorProduct)
      {alert(errorProduct)}
      else{
          console.log(product);
          alert("Added Successfully!");
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
            placeholder="Enter Product Unit"
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
          Edit Product
        </Button>
      </Form>
    </Modal.Body>
  </Modal>

  ) 
}

function EditQuantityModal(props)
{
  const [productQuantity, setProductQuantity] = useState('');
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const { productId } = props;
    let merchant_id;
    const { data: { user } } = await supabase.auth.getUser();

     let { data: merchant, error:merchError } = await supabase
    .from('merchant')
    .select('*');

      if(merchError)
        console.log(merchError);

    merchant.forEach(merch => {
      if(merch.uuid === user.id)
      {
        merchant_id = merch.id;
      }
    });

    

    
    const { data:product, error:prodError } = await supabase
    .from('product')
    .update({ product_quantity: productQuantity })
    .eq( 'id', productId)
    .select()

    if(prodError)
      {alert(prodError)}
    else
      {
        alert("Transaction Completed Successfully");
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
              Add Quantity
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

function MyVerticallyCenteredModal(props) {
    const [productName,setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productUnit, setProductUnit] = useState('');
    const [imagePath, setImagePath] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let merchant_id;
        const { data: { user } } = await supabase.auth.getUser();

         let { data: merchant, error:merchError } = await supabase
        .from('merchant')
        .select('*');
  
        if(merchError)
          console.log(merchError);

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
          user_id: merchant_id,
          product_image: imagePath
        }
        ])
        .select();
        
        if(errorProduct)
        {alert(errorProduct)}
        else{
            console.log(product);
            alert("Added Successfully!");
        }
    }
 
    async function uploadImage(e){
      let file = e.target.files[0];

      const { data, error } = await supabase
        .storage
        .from('product')
        .upload('public/' + file.name, file,{
          cacheControl: "3600",
          upsert: false,
        });
        
        console.log(data);
        setImagePath(data.path);
        if(error){
          console.log(error);
        }
        else{
          console.log(data);
          console.log(file.name);
          console.log(file);
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
                placeholder="Enter Product Unit"
                onChange={(e) => setProductUnit(e.target.value)}
                value={productUnit}
              />
            </Form.Group>

            <Form.Group className="my-1">
              <Form.Label className="FormLabel">Product Image</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  color: "black",
                }}
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                
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