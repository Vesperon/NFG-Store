import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OwnerNavbar from "./OwnerNavbar";
import { Modal } from "react-bootstrap";
import supabase from "./supabaseClient";
import SideBar from "./Sidebar";
import calculateTotal from "./calculateTotal";
import { useEffect, useState } from "react";

const Order = () => {
    const [transaction, setTransaction] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [orders, setOrder] = useState([]);
    const [productModal, setProductModal] = useState(false);
    const [orderProducts, setOrderProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null);
    useEffect(() => {
        fetchOrder();
    }, []);

    async function fetchOrder() {
        let merchant_id;
        const { data: { user } } = await supabase.auth.getUser();

        let { data: merchant, error: merchError } = await supabase
            .from('merchant')
            .select('*');

        merchant.forEach(merch => {
            if (merch.uuid === user.id) {
                merchant_id = merch.id;
            }
        });

        if (merchError) console.log(merchError);
        else console.log(merchant_id);

        let { data: transactions, error } = await supabase
            .from('transaction')
            .select('*');
        if (error) console.log(error);
        else {
            setTransaction(transactions);
            console.log(transactions);
        }

        if (transactions && transactions.length > 0) {
            let { data: order, error: orderError } = await supabase
                .from('order')
                .select('*')
                .in('transaction_id', transactions.map(t => t.id));
            if (orderError) console.log(orderError);
            else {
                setOrder(order);
                console.log(order);
            }
        }
    }

    async function transactionDelete(transaction) {
        const { error } = await supabase
            .from('transaction')
            .update({ status: 'Declined' })
            .eq('id', transaction.id)
            .select();

        if (error) {
            console.log(error);
        } else {
            fetchOrder(); // Refresh the order list after deleting a transaction
        }
    }

    async function TransactionAccept(transaction) {
        const { error } = await supabase
            .from('transaction')
            .update({ status: 'Accepted' })
            .eq('id', transaction.id)
            .select();

        if (error) {
            console.log(error);
        } else {
            fetchOrder(); // Refresh the order list after accepting a transaction
        }

        let { data: order, error: orderError } = await supabase
            .from('order')
            .select('*')
            .eq('transaction_id', transaction.id);

        if (orderError) {
            console.log(orderError);
        } else {
            console.log(order);
            setOrderProducts(order);

            for (const order of orders) {
                const { data: products, error: prodError } = await supabase
                    .from('product')
                    .select('id, product_quantity')
                    .eq('id', order.order_product_id);

                if (prodError) {
                    console.log(prodError);
                } else {
                    console.log(products);
                }

                if (prodError) throw new Error(prodError.message);
                if (products.length === 0) throw new Error('Product not found');

                const product = products[0];
                const newQuantity = product.product_quantity - order.order_quantity;

                const { error: updateError } = await supabase
                    .from('product')
                    .update(
                        { 
                            product_quantity: newQuantity,
                            product_sold: order.order_quantity  
                         } 
                    )
                    .eq('id', order.order_product_id)
                    .select();

                if (updateError) throw new Error(updateError.message);
            }
        }
        const total = await calculateTotal(transaction.id);
        setTotalAmount(total);
        console.log(total);
        console.log(totalAmount);
        
        
        const { error:totalAmountError } = await supabase
        .from('transaction')
        .update({ total_amount: total })
        .eq('id', transaction.id)
        .select();
        if(totalAmountError)
            console.log(totalAmountError);



    }

    return (
        <div>
            <OwnerNavbar />
            <Row className="row">
                <Col className="col">
                <SideBar />
                </Col>

                <Col xs={10}>
                    <h1 className="date">Date Today: 14/04/2024</h1>
                    <Table className="px-5 mt-5">
                        <thead>
                            <tr>
                                <th className="custom-thead">ID</th>
                                <th className="custom-thead">MERCHANT ID</th>
                                <th className="custom-thead">Name</th>
                                <th className="custom-thead">Status</th>
                                <th className="custom-thead">Product</th>
                                <th className="custom-thead">Confirm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.map((trans) => (
                                <tr key={trans.id}>
                                    <th className="pt-3">{trans.id}</th>
                                    <th className="pt-3">{trans.merchant_id}</th>
                                    <th className="pt-3">{trans.merchant_name}</th>
                                    <th className="pt-3">{trans.status}</th>
                                    <th>
                                        <Button className="confirm" onClick={() => {
                                            setSelectedProductId(trans.id);
                                            setProductModal(true);
                                        }}>
                                            . . .
                                        </Button>
                                    </th>
                                    {trans.status === "pending" ? (
                                        <th>
                                            <Button className="confirm mx-1" onClick={() => TransactionAccept(trans)} >Accept</Button>
                                            <Button className="confirm mx-1 bg-danger border-danger" onClick={() => transactionDelete(trans)}>Decline</Button>
                                        </th>
                                    ) : (
                                        <th>
                                            Confirmed
                                        </th>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <OrderProductsModal
                        show={productModal}
                        onHide={() => setProductModal(false)}
                        productID={selectedProductId}
                    />
                </Col>
            </Row>
        </div>
    );

    function OrderProductsModal(props) {
        const [products, setProducts] = useState([]);
        const { productID } = props;

        useEffect(() => {
            if (productID)
                fetchProducts();
        }, [productID]);

        async function fetchProducts() {
            let { data: order, error } = await supabase
                .from('order')
                .select('*')
                .eq('transaction_id', productID);
            if (error)
                console.log(error)
            else
                setProducts(order);
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
                        Ordered Products
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {products.map((product, index) => (
                            <div className="d-flex mb-3" key={index} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                <div className="flex-grow-1">
                                    <h5>{product.order_product}</h5>
                                    <p>Quantity: {product.order_quantity}</p>
                                    <p>Price: ${product.order_price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Order;
