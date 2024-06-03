import { Col, Card, Button } from "react-bootstrap";
import { useCart } from "react-use-cart";

const ItemCard = ({ product, index }) => {
    const CDNURL = "https://nrtujxglikuaeykrmczf.supabase.co/storage/v1/object/public/product/";
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id, // Ensure the unique product id is passed here
            price: product.product_price,
            name: product.product_name,
            product_image: product.product_image,
            product_category: product.product_category,
            product_quantity: product.product_quantity,
            product_unit: product.product_unit,
            product_brand: product.product_brand
        });
    };

    return (
        <Col key={product.id} className="cardShop">
            <Card className="fixed-card my-5">
                <Card.Img
                    variant="top"
                    src={CDNURL + product.product_image}
                    className="p-4"
                    style={{ borderBottom: "1px solid", height: "200px" }}
                />
                <Card.Body className="fixed-card-body">
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text>{product.product_category}</Card.Text>
                    <Card.Text>Stock Available: {product.product_quantity}</Card.Text>
                    <Card.Text>₱ {product.product_price}</Card.Text>
                    <Card.Text>Unit: {product.product_unit}</Card.Text>
                    <Button
                        style={{ backgroundColor: "white", color: "black", border: "1px solid" }}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ItemCard;
