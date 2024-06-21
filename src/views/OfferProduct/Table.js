import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
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
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    DialogActions,
    TextField,
    Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PermMediaIcon from '@mui/icons-material/PermMedia';

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedProductName, setEditedProductName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetchProducts();
    }, []);

    // Adjusted fetchProducts function with error handling and loading state management
    const fetchProducts = async () => {
        setLoading(true);
        setError(null); 
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-Offer-Products/", {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (Array.isArray(response.data)) {
                setProducts(response.data);
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


    const handleDeleteConfirmation = (id) => {
        setDeleteProductId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://127.0.0.1:8000/admin/Bepocart-product-delete/${deleteProductId}/`,{
                headers: {
                    'Authorization': `${token}`,
                    },
            });
            setProducts(products.filter(product => product.id !== deleteProductId));
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting product:", error);
            setError("Error deleting product");

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
                            <TableCell>Image</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Offer Type</TableCell>
                            <TableCell>Variation</TableCell>
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
                                        <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography variant="h6" noWrap>
                                                {product.name}
                                            </Typography>
                                        </Link>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/product-image-form/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img
                                            src={`http://127.0.0.1:8000/${product.image}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="h6" noWrap>
                                            {product.salePrice}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="h6" noWrap color={product.stock === 0 ? 'error' : 'primary'}>
                                            {product.stock === 0 ? 'Stock Out' : 'In Stock'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{ backgroundColor: product.offer_type ? 'warning.main' : 'inherit', pl: '4px', pr: '4px' }}
                                        size="small"
                                        label={product.offer_type || 'No offer'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/product-image-table/${product.id}/`}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<PermMediaIcon />}
                                    >
                                        Variant
                                    </Button>
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default TableBanner;
