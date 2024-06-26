import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams(); // id is received as a string

    useEffect(() => {
        const productId = parseInt(id);
        fetchProducts(productId);
    }, [id]);

    const fetchProducts = async (productId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log("token   :",token)
            const response = await axios.get(`http://127.0.0.1:8000/admin/Bepocart-Product-images/${productId}/`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            console.log(response.data)
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
            await axios.delete(`http://127.0.0.1:8000/admin/Bepocart-Product-images-delete/${deleteProductId}/`,{
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




    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <>
            {products.length === 0 ? (
                <Typography>No products found.</Typography>
            ) : (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image 1</TableCell>
                            <TableCell>Image 2</TableCell>
                            <TableCell>Image 3</TableCell>
                            <TableCell>Image 4</TableCell>
                            <TableCell>Image 5</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <Box sx={{ maxWidth: "150px" }}>
                                        <Typography variant="h6" noWrap>
                                            {product.color}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image1}`}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image2}`}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image3}`}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image4}`}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`http://127.0.0.1:8000/${product.image5}`}
                                        alt={product.name}
                                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                                    />
                                </TableCell>
                                <TableCell>{product.size_names}</TableCell>
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
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableBanner;
