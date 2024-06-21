import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Chip,
} from "@mui/material";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-Orders/", {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                if (Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setError("Invalid data format received");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/login');
                } else {
                    setError("Error fetching banners");
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts(); // Call fetchProducts directly here
    
    }, [navigate]); // Include navigate in the dependency array if it's used inside useEffect
    

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <Typography variant="body1">Loading...</Typography>
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : (
                <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Image</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Coupen</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Payment ID</TableCell>
                            <TableCell>Orders</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography variant="body1" noWrap>
                                                {product.customerName}
                                            </Typography>
                                        </Link>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img
                                            src={`http://127.0.0.1:8000/${product.customerImage}`}
                                            alt={product.customerName}
                                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="body1" noWrap>
                                            {product.address}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="body1" noWrap>
                                            {product.total_amount}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            pl: "4px",
                                            pr: "4px",
                                            backgroundColor: product.status === "pending" ? "red" : "green",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="body1" noWrap
                                            sx={{ color: product.couponName ? 'inherit' : 'red' }}>

                                            <LocalOfferIcon sx={{ mr: 1 }} />
                                            {product.couponName ? product.couponName : "No coupon "}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography
                                            variant="body1"
                                            noWrap
                                            sx={{
                                                color:
                                                    product.payment_method === "COD"
                                                        ? "green"
                                                        : product.payment_method === "razorpay"
                                                            ? "blue"
                                                            : "inherit",
                                            }}
                                        >
                                            {product.payment_method}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="body1" noWrap>
                                            {product.payment_id ? product.payment_id : "N/A"}

                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/order-product-table/${product.id}/`}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<PermMediaIcon />}
                                    >
                                        Orders
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default TableBanner;
