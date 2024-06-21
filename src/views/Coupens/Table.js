import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate} from 'react-router-dom';

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import { green } from '@mui/material/colors';

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-promotion-coupen-views/",{
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setError("Invalid data format");
                console.error("Invalid data format:", response.data);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                }}
            >
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>COUPEN</TableCell>
                        <TableCell>TYPE</TableCell>
                        <TableCell>DISCOUNT</TableCell>
                        <TableCell>START DATE</TableCell>
                        <TableCell>END DATE</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>STATUS PRODUCT</TableCell>
                        <TableCell>STATUS CATEGORY</TableCell>
                    </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {product.code}
                                        </Typography>
                                    </Link>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.coupon_type}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.discount}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.start_date}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.end_date}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: product.status === "In Active" ? "red" : (product.status === "Active" ? green[500] : product.pbg),
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={product.status}
                                />
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.discount_product ? product.discount_product : "No products"}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {product.category}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </>
    );
};

export default TableBanner;
