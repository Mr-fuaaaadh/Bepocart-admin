import React, { useEffect, useState } from "react";
import axios from "axios";

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
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CategoryTable = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedProductName, setEditedProductName] = useState("");
    const [editedProductImage, setEditedProductImage] = useState(null); // Define editedProductImage state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log("token",      token)
            const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-subcategories/",{
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
                console.log("Response data:", response.data.data);
            } else {
                console.error("Invalid data format:", response.data);
                setError("Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Error fetching sub categories");
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
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }
    
            await axios.delete(`http://127.0.0.1:8000/admin/Bepocart-subcategory-delete/${deleteProductId}/`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
    
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
            // Prepare form data
            const formData = new FormData();
            formData.append("name", editedProductName);
            if (editedProductImage) {
                formData.append("image", editedProductImage);
            }
            
            await axios.put(`http://127.0.0.1:8000/admin/Bepocart-category-update/${editProductId}/`, formData);
            
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
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : (
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
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Update</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.categoryName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image}`}
                                        alt={product.name}
                                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDeleteConfirmation(product.id)}>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleUpdate(product.id, product.name)}>
                                        <EditIcon /> Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Confirm</Button>
                </DialogActions>
            </Dialog>




            {/* Edit Product Dialog */}
<Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
    <DialogTitle>Edit Product</DialogTitle>
    <DialogContent>
        <TextField
            label="Product Name"
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
        />
        <Box mt={2}>
            <Typography variant="subtitle1">Product Image:</Typography>
            <Box mt={1}>
                {editedProductImage && (
                    <img
                        src={URL.createObjectURL(editedProductImage)}
                        alt="Product"
                        style={{ maxWidth: "100%", borderRadius: "4px" }}
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedProductImage(e.target.files[0])}
                    style={{ marginTop: "8px" }}
                />
            </Box>
        </Box>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleEditDialogClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
        </Button>
    </DialogActions>
</Dialog>


        </>
    );
};

export default CategoryTable;
