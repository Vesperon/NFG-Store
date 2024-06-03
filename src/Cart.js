import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCart } from "react-use-cart";
import Button from "react-bootstrap/Button";
import supabase from "./supabaseClient";

const Cart = () => {
    const [cartModalShow, setCartModalShow] = useState(false);
    const { cartTotal } = useCart();

    return (
        <div>
            <Button 
                className="position-sticky bottom-0 start-100" 
                onClick={() => setCartModalShow(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <i className="bi bi-cart4" style={{ fontSize: '1.5rem' }}></i>
            </Button>
            <MyCartModal 
                show={cartModalShow}
                onHide={() => setCartModalShow(false)}
            />
        </div>
    );
};

function MyCartModal(props){
    const {
        isEmpty,
        totalItems,
        items,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const handleCheckout = async () => {
        try {
            let randomId = Math.floor((Math.random() * 10000000) + 1);
            let merchant_id;
            let merchant_name;
            const { data: { user } } = await supabase.auth.getUser();
            
            let { data: merchant, error: merchError } = await supabase
            .from('merchant')
            .select('*');
    
            if(merchError) throw new Error(merchError.message);
    
            merchant.forEach(merch => {
                if(merch.uuid === user.id) {
                    merchant_id = merch.id;
                    merchant_name = merch.username;
                }
            });

            const { error: transactionError } = await supabase
            .from('transaction')
            .insert([
            { 
                id: randomId,
                merchant_id: merchant_id, 
                merchant_name: merchant_name,
                status: 'pending'
            }])
            .select();
            
            if(transactionError) throw new Error(transactionError.message);

            const { error: orderError } = await supabase
            .from('order')
            .insert(items.map(item => ({
                order_product_id: item.id,
                order_product: item.name,
                order_quantity: item.quantity,
                order_category: item.product_category,
                order_unit: item.product_unit,
                order_price: item.price,
                order_brand: item.product_brand,
                transaction_id: randomId
            })));
            
            if(orderError) throw new Error(orderError.message);

            for (const item of items) {
                const { data: products, error: prodError } = await supabase
                .from('product')
                .select('id, product_quantity')
                .eq('id', items.id);

                if(prodError) throw new Error(prodError.message);
                if(products.length === 0) throw new Error('Product not found');

                const product = products[0];
                const newQuantity = product.product_quantity - items.quantity;

                const { error: updateError } = await supabase
                .from('product')
                .update({ product_quantity: newQuantity })
                .eq('id', items.id)
                .select();

                if(updateError) throw new Error(updateError.message);
            }

            emptyCart();
            props.onHide();
            alert("Ordered!");
        } catch (error) {
            console.error('Error during checkout:', error.message);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cart Items
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isEmpty ? (
                    <h5 className="text-center">Your cart is empty</h5>
                ) : (
                    <div>
                        <h5 className="mb-3">Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Total Price: ${cartTotal}</h4>
                            <Button variant="outline-danger" onClick={emptyCart}>Empty Cart</Button>
                        </div>
                        {items.map((item, index) => (
                            <div className="d-flex mb-3" key={index} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                <div className="flex-grow-1">
                                    <h5>{item.name}</h5>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price}</p>
                                    <p>Unit: ${item.product_unit}</p>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <Button 
                                        variant="info" 
                                        className="mb-1" 
                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                    >-</Button>
                                    <Button 
                                        variant="info" 
                                        className="mb-1" 
                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                    >+</Button>
                                    <Button 
                                        variant="danger" 
                                        className="mb-1" 
                                        onClick={() => removeItem(item.id)}
                                    >Remove</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!isEmpty && (
                    <Button variant="success" onClick={handleCheckout}>Checkout</Button>
                )}
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Cart;
