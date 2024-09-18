import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Container,
} from "@mui/material";

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const productId = parseInt(id);
        fetchProducts(productId);
    }, [id]);

    const fetchProducts = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/admin/Bepocart-Order-Item/${productId}/`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
                setOrder(response.data.order);
            } else {
                console.error("Invalid data format:", response.data);
                setError("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Error fetching orders");
        } finally {
            setLoading(false);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const TotalPrice = () => {
        const productTotal = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        return productTotal.toFixed(2);
    };

    const ProductOriginalPrice = () => {
        const productTotal = products.reduce((total, product) => total + (product.salePrice * product.quantity), 0);
        return productTotal.toFixed(2);
    };

    const shippingCharge = parseFloat(order.total_amount) < 500 ? 60.00 : 0.00;

    const TotalFreeQuantity = () => {
        const totalFreeQuantity = products.reduce((total, product) => total + product.free_quantity, 0);
        return totalFreeQuantity;
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Container>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>PRODUCT</TableCell>
                        <TableCell>SIZE</TableCell>
                        <TableCell>PRICE</TableCell>
                        <TableCell>TOTAL QUANTITY</TableCell>
                        <TableCell>AMOUNT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell>#{index + 1}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <img
                                        src={`${product.productImage}`}
                                        style={{ maxWidth: "50px", maxHeight: "50px", marginRight: "10px" }}
                                    />
                                    <Typography
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: "150px",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                    >
                                        {truncateText(product.productName, 20)}
                                        {product.offer_type !== "none" && (
                                            <span style={{ marginTop: '4px', fontSize: '0.875rem', color: 'green' }}>
                                                {product.offer_type}
                                            </span>
                                        )}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                {product.size && product.color
                                    ? `${product.size}, ${product.color}`
                                    : product.size || product.color || 'N/A'}
                            </TableCell>

                            <TableCell>₹{product.price} /-</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>₹{product.quantity * product.price} /-</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {products.some(product => product.offer_type !== "none") && (
                <Box
                    mt={2}
                    p={2}
                    border="1px dotted green"
                    borderRadius="4px"
                    bgcolor="#e8f5e9"
                    display="flex"
                    justifyContent="flex-start"
                >
                    <Typography variant="subtitle1">Total Free Quantity : {order.free_quantity}</Typography>
                </Box>
            )}

            <Box mt={7} display="flex" justifyContent="flex-end">
                <Box mr={4}>
                    <Typography variant="subtitle1">Subtotal :</Typography>
                    <Typography variant="subtitle1">Discount :</Typography>
                    <Typography variant="subtitle1">Shipping :</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">Total :</Typography>
                    <Typography variant="subtitle1">Status :</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1">₹{TotalPrice()} /-</Typography>
                    <Typography variant="subtitle1">₹{TotalPrice() - ProductOriginalPrice()} /-</Typography>
                    <Typography variant="subtitle1">₹{shippingCharge.toFixed(2)}/-</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">₹{order.total_amount} /-</Typography>
                    <Typography variant="subtitle1" color="secondary">{order.status}</Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default TableBanner;
