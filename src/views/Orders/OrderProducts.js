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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedProductName, setEditedProductName] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [couponCodeCharge, setCouponCodeCharge] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { id } = useParams(); // id is received as a string

    useEffect(() => {
        // Convert id to a number
        const productId = parseInt(id);

        fetchProducts(productId); // Pass id to fetchProducts function
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

    const handleDeleteConfirmation = (id) => {
        setDeleteProductId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/admin/Bepocart-Product-images-delete/${deleteProductId}/`);
            setProducts(products.filter(product => product.id !== deleteProductId));
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteProductId(null);
        setDeleteDialogOpen(false);
    };

    const handleUpdate = (id, name) => {
        setEditProductId(id);
        setEditedProductName(name);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditProductId(null);
        setEditDialogOpen(false);
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/admin/Bepocart-Banner-update/${editProductId}/`, {
                name: editedProductName,
                // Add other fields you want to update
            });
            // Update product locally
            const updatedProducts = products.map(product =>
                product.id === editProductId ? { ...product, name: editedProductName } : product
            );
            setProducts(updatedProducts);
            setEditDialogOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const calculateTotalAmount = () => {
        let total = 0;
        products.forEach(product => {
            total += product.quantity * product.salePrice;
        });
        setTotalAmount(total);
    };
    
    const calculateDiscountPrice = () => {
        let discount = 0;
        products.forEach(product => {
            if (product.offer_type === 'discount') {
                discount += product.quantity * product.salePrice;
            }
        });
        setDiscountPrice(discount);
    };
    
    const calculateCouponCodeCharge = () => {
    };
    useEffect(() => {
        calculateTotalAmount();
        calculateDiscountPrice();
        calculateCouponCodeCharge();
    }, [products]);
    
    

    return (
        <>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Offer Type</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>color</TableCell>
                        {/* <TableCell>Update</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: "150px" }}>
                                    <Typography variant="h6" noWrap>
                                        {product.productName}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>

                                <img
                                    src={`http://127.0.0.1:8000/${product.productImage}`}
                                    alt={product.name}
                                    style={{ maxWidth: "70px", maxHeight: "70px" }}
                                />

                            </TableCell>


                            <TableCell>{product.quantity}</TableCell>

                            <TableCell>{product.salePrice}</TableCell>

                            <TableCell>{product.quantity * product.salePrice}</TableCell>

                            <TableCell>
                                <Chip
                                    sx={{
                                        backgroundColor: product.offer_type ? 'warning.main' : 'inherit',
                                        pl: '4px',
                                        pr: '4px',
                                    }}
                                    size="small"
                                    label={product.offer_type || 'No offer'}
                                />
                            </TableCell>


                            <TableCell>{product.size}</TableCell>

                            <TableCell>{product.color}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box mt={7} >
                <Typography variant="subtitle1">Total Amount: ${totalAmount}</Typography>
                <Typography variant="subtitle1">Discount Price: ${discountPrice}</Typography>
                <Typography variant="subtitle1">Coupon Code Charge: ${couponCodeCharge}</Typography>
            </Box>



        </>

    );
};

export default TableBanner;
