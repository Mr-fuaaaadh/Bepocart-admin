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

    const { id } = useParams(); // id is received as a string

    useEffect(() => {
        // Convert id to a number
        const productId = parseInt(id);

        fetchProducts(productId); // Pass id to fetchProducts function
    }, [id]);

    const fetchProducts = async (productId) => {
        try {
            const response = await axios.get(`https://flex-hiring-trailers-spy.trycloudflare.com/admin/Bepocart-Order-Item/${productId}/`);
            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } else {
                console.error("Invalid data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteProductId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://flex-hiring-trailers-spy.trycloudflare.com/admin/Bepocart-Product-images-delete/${deleteProductId}/`);
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
            await axios.put(`https://flex-hiring-trailers-spy.trycloudflare.com/admin/Bepocart-Banner-update/${editProductId}/`, {
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
                        <TableCell>Delete</TableCell>
                        <TableCell>Update</TableCell>
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

                            <TableCell>{product.price}</TableCell>

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


                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteConfirmation(product.id)}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => handleUpdate(product.id, product.name)}
                                    startIcon={<EditIcon />}
                                >
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Delete Confirmation Dialog */}
            < Dialog open={deleteDialogOpen} onClose={handleCancelDelete} >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Confirm</Button>
                </DialogActions>
            </Dialog >

            {/* Edit Product Dialog */}
            < Dialog open={editDialogOpen} onClose={handleEditDialogClose} >
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Product Name"
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default TableBanner;
