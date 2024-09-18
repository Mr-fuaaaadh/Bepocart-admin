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
    Select,
    MenuItem,
    TablePagination
} from "@mui/material";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PropTypes from 'prop-types';

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'red';
        case 'Processing':
            return 'yellow';
        case 'Packing':
            return 'blue';
        case 'Completed':
            return 'green';
        case 'Refunded':
            return 'orange';
        case 'Cancelled':
            return 'grey';
        default:
            return 'inherit';
    }
};

const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
        ) : (
            part
        )
    );
};

const TableBanner = ({ searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-Orders/", {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                if (Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    console.error("Invalid data format:", response.data.data);
                    setError("Invalid data format received");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/login');
                } else {
                    setError("Error fetching orders");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await axios.put(`http://127.0.0.1:8000/admin/Bepocart-Order-status-update/${productId}/`,
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, status: newStatus } : product
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const filteredProducts = products.filter(product =>
        (product.customerName && product.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.created_at && product.created_at.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <Typography variant="body1">Loading...</Typography>
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : (
                <>
                    <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>ORDER ID</TableCell>
                                <TableCell>TIME</TableCell>
                                <TableCell>CUSTOMER NAME</TableCell>
                                <TableCell>Customer Image</TableCell>
                                <TableCell>DATE</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Coupon</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Payment ID</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Orders</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>
                                        <Box sx={{ maxWidth: "150px" }}>
                                            <Link to={`/order-bill/${product.order_id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="body1" noWrap>
                                                    {highlightText(product.order_id, searchQuery)}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ maxWidth: "150px" }}>

                                            <Typography variant="body1" noWrap>
                                                {product.created_time}
                                            </Typography>

                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ maxWidth: "150px" }}>

                                            <Typography variant="body1" noWrap>
                                                {highlightText(product.customerName, searchQuery)}
                                            </Typography>

                                        </Box>
                                    </TableCell>

                                    <TableCell>

                                        <img
                                            src={`${product.customerImage}`}
                                            alt={product.customerName}
                                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                                        />

                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ maxWidth: "250px" }}>
                                            <Typography variant="body1">
                                                {highlightText(product.created_at, searchQuery)}
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
                                        <Select
                                            value={product.status}
                                            onChange={(e) => handleStatusChange(product.id, e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            size="small"
                                            sx={{
                                                color: getStatusColor(product.status),
                                                minWidth: '120px', // Example: Set minimum width for consistency
                                            }}
                                        >
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="Processing">Processing</MenuItem>
                                            <MenuItem value="Packing">Packing</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            <MenuItem value="Refunded">Refunded</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                        </Select>
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
                                                {product.payment_id}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ maxWidth: "150px" }}>
                                            <Typography variant="body1" noWrap>
                                                {product.razorpay_order_id}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<PermMediaIcon />}
                                            sx={{ mt: 1 }}
                                            onClick={() => navigate(`/order-product-table/${product.id}/`)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </>
    );
};

TableBanner.propTypes = {
    searchQuery: PropTypes.string.isRequired,
};

export default TableBanner;
