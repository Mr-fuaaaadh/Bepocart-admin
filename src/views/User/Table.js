import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {
    Typography,
    Box,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    IconButton,
    Table,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null); // To store customer details for editing
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [image, setImage] = useState(null); // For image upload
    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        place: '',
        zip_code: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null); 
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-customers/", {
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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:8000/admin/Bepocart-customer-delete/${id}/`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error("Error deleting customer:", error);
                setError("Error deleting customer");
            }
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setFormValues({
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            place: customer.place,
            zip_code: customer.zip_code,
        });
        setOpenEditDialog(true);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the uploaded image file
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleEditSubmit = async () => {
        const formData = new FormData();
        formData.append('first_name', formValues.first_name);
        formData.append('last_name', formValues.last_name);
        formData.append('email', formValues.email);
        formData.append('phone', formValues.phone);
        formData.append('place', formValues.place);
        formData.append('zip_code', formValues.zip_code);
        if (image) {
            formData.append('image', image); // Add the image to the form data
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://127.0.0.1:8000/admin/Bepocart-customer-update/${selectedCustomer.id}/`, formData, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setOpenEditDialog(false);
            fetchProducts(); // Refresh product list after edit
        } catch (error) {
            console.error("Error updating customer:", error);
            setError("Error updating customer");
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
                <>
                    <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Place</TableCell>
                                <TableCell>PinCode</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.first_name} {product.last_name}</TableCell>
                                    <TableCell>
                                        <img
                                            src={product.image}
                                            alt={product.first_name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    </TableCell>
                                    <TableCell>{product.email}</TableCell>
                                    <TableCell>{product.phone}</TableCell>
                                    <TableCell>{product.place}</TableCell>
                                    <TableCell>{product.zip_code}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(product)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(product.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Edit Customer Dialog */}
                    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogTitle>Edit Customer</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="First Name"
                                name="first_name"
                                value={formValues.first_name}
                                onChange={handleFormChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Last Name"
                                name="last_name"
                                value={formValues.last_name}
                                onChange={handleFormChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                name="email"
                                value={formValues.email}
                                onChange={handleFormChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Phone"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleFormChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Place"
                                name="place"
                                value={formValues.place}
                                onChange={handleFormChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Pin Code"
                                name="zip_code"
                                value={formValues.zip_code}
                                onChange={handleFormChange}
                                fullWidth
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
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                            <Button onClick={handleEditSubmit} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    );
};

export default TableBanner;
