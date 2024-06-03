import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import supabase from "./supabaseClient";
import ItemCard from "./ItemCard"; // Make sure to import the ItemCard component correctly

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            let { data: products, error } = await supabase
                .from('product')
                .select('*')
                .eq('user_id', 16);
            if (error) {
                console.log(error);
            } else {
                setProducts(products);
            }
        };
        fetchProduct();
    }, []);

    return (
        <section>
            <Row>
                {products.map((product, index) => (
                    <ItemCard key={product.id} product={product} index={index} />
                ))}
            </Row>
        </section>
    );
};

export default ProductList;
