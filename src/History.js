import Navbar from "./Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import supabase from "./supabaseClient";
import OwnerNavbar from "./OwnerNavbar";
import { useState, useEffect } from "react";

const History = () => {
    const [userID, setUserID] = useState(null);
    const [ownerTransactions, setOwnerTransactions] = useState([]);
    const [merchantTransactions, setMerchantTransactions] = useState([]);
    
    useEffect(() => {
        UserID();
    }, []);
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    async function UserID() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || !user.id) {
                console.error("User is not authenticated or user ID is missing");
                return;
            }
            console.log("User ID:", user.id);

            const { data: merchant, error: merchError } = await supabase
                .from('merchant')
                .select('*');
            
            if (merchError) {
                console.error("Error fetching merchants:", merchError);
                return;
            }

            let merchant_id = null;
            merchant.forEach(merch => {
                if (merch.uuid === user.id) {
                    merchant_id = merch.id;
                }
            });

            if (!merchant_id) {
                console.error("Merchant ID not found for user ID:", user.id);
                return;
            }

            setUserID(merchant_id);
            console.log("Merchant ID:", merchant_id);

            if (merchant_id === 16) {
                const { data: transaction, error } = await supabase
                    .from('transaction')
                    .select('*')
                    .eq('status', 'Accepted');
                if (error) {
                    console.error("Error fetching owner transactions:", error);
                } else {
                    console.log("Owner Transactions:", transaction);
                    setOwnerTransactions(transaction);
                }
            } else {
                const { data: transaction, error } = await supabase
                    .from('transaction')
                    .select('*')
                    .eq('merchant_id', merchant_id);
                if (error) {
                    console.error("Error fetching merchant transactions:", error);
                } else {
                    console.log("Merchant Transactions:", transaction);
                    setMerchantTransactions(transaction);
                }
            }
        } catch (error) {
            console.error("Error in UserID function:", error);
        }
    }
    
    return (
        <div>
            {userID === 16 ? (
                <OwnerNavbar />
            ) : (
                <Navbar />
            )}
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
                    <h1 className="date">Date Today: 14/04/2024</h1>
                    <h1 className="recently">Recently</h1>
                    <Table className="px-5 mt-1">
                        <thead>
                            {userID === 16 ? (
                                <tr>
                                    <th className="custom-thead">DATE</th>
                                    <th className="custom-thead">CUSTOMER ID</th>
                                    <th className="custom-thead">NAME</th>
                                    <th className="custom-thead">TRANSACTION ID</th>
                                    <th className="custom-thead">AMOUNT</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="custom-thead">DATE</th>
                                    <th className="custom-thead">CUSTOMER ID</th>
                                    <th className="custom-thead">NAME</th>
                                    <th className="custom-thead">TRANSACTION ID</th>
                                    <th className="custom-thead">STATUS</th>
                                    <th className="custom-thead">AMOUNT</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {userID === 16 ? (
                                ownerTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <th className="pt-3">{new Date(transaction.created_at).toLocaleDateString()}</th>
                                        <th className="pt-3">{transaction.merchant_id}</th>
                                        <th className="pt-3">{transaction.merchant_name}</th>
                                        <th className="pt-3">{transaction.id}</th>
                                        <th className="pt-3">{transaction.total_amount}</th>
                                    </tr>
                                ))
                            ) : (
                                merchantTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <th className="pt-3">{new Date(transaction.created_at).toLocaleDateString()}</th>
                                        <th className="pt-3">{transaction.merchant_id}</th>
                                        <th className="pt-3">{transaction.merchant_name}</th>
                                        <th className="pt-3">{transaction.id}</th>
                                        <th className="pt-3">{transaction.status}</th>
                                        <th className="pt-3">{transaction.total_amount}</th>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
}

export default History;
