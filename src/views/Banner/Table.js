import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [dialog, setDialog] = useState({ delete: false, edit: false });
    const [currentProduct, setCurrentProduct] = useState(null);
    const [editedProductName, setEditedProductName] = useState("");
    const [editedProductImage, setEditedProductImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        return () => {
            if (editedProductImage) {
                URL.revokeObjectURL(URL.createObjectURL(editedProductImage));
            }
        };
    }, [editedProductImage]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("https://bepocart.in/admin/Bepocart-Banners/", {
                headers: { 'Authorization': `${token}` },
            });
            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } else {
                console.error("Invalid data format:", response.data);
                setError("Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            } else {
                setError("Error fetching banners");
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleDeleteConfirmation = (product) => {
        setCurrentProduct(product);
        setDialog({ ...dialog, delete: true });
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://bepocart.in/admin/Bepocart-Banner-delete/${currentProduct.id}/`, {
                headers: { 'Authorization': `${token}` },
            });
            setProducts(products.filter(product => product.id !== currentProduct.id));
            setDialog({ ...dialog, delete: false });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setEditedProductName(product.name);
        setEditedProductImage(null); // Reset image on edit
        setDialog({ ...dialog, edit: true });
    };

    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append("name", editedProductName);
            if (editedProductImage) {
                formData.append("image", editedProductImage);
            }

            await axios.put(`https://bepocart.in/admin/Bepocart-Banner-update/${currentProduct.id}/`, formData, {
                headers: { 'Authorization': `${token}`, 'Content-Type': 'multipart/form-data' },
            });

            setProducts(products.map(product =>
                product.id === currentProduct.id ? { ...product, name: editedProductName, image: editedProductImage ? URL.createObjectURL(editedProductImage) : product.image } : product
            ));
            setDialog({ ...dialog, edit: false });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : (
                <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product,index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Typography variant="h6">{product.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <Typography variant="h6">{product.category}</Typography>

                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDeleteConfirmation(product)}>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleEdit(product)}>
                                        <EditIcon /> Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={dialog.delete} onClose={() => setDialog({ ...dialog, delete: false })}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog({ ...dialog, delete: false })}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={dialog.edit} onClose={() => setDialog({ ...dialog, edit: false })} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Product Name"
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setEditedProductImage(e.target.files[0])}
                        />
                    </Button>
                    {editedProductImage || currentProduct?.image ? (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Selected Image:</Typography>
                            <img
                                src={editedProductImage ? URL.createObjectURL(editedProductImage) : currentProduct?.image}
                                alt="Selected"
                                style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "4px" }}
                            />
                        </Box>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog({ ...dialog, edit: false })}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableBanner;
