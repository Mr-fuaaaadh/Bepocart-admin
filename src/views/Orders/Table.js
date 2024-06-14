import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


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

const TableBanner = () => {
    const [products, setProducts] = useState([]);
  

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://flex-hiring-trailers-spy.trycloudflare.com/admin/Bepocart-Orders/");
            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } else {
                console.error("Invalid data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };




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
                        <TableCell>Id</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Orders</TableCell>
                        
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
                                            {product.customerName}
                                        </Typography>
                                    </Link>

                                </Box>
                            </TableCell>
                            <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.customerImage}`}
                                        alt={product.name}
                                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                                    />
                                </TableCell>
                            </Link>
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
                                        {product.address}
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
                                        {product.total_amount}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                        pl: "4px",
                                        pr: "4px",
                                        backgroundColor: product.status === "pending" ? "red" : product.pbg,
                                        color: "#fff",
                                    }}
                                    size="small"
                                    label={product.status}
                                />
                            </TableCell>


                            <TableCell>
                                <Button
                                    component={Link}
                                    to={`/order-product-table/${product.id}/`}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PermMediaIcon />}
                                >
                                    Variant
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >

        </>
    );
};

export default TableBanner;
