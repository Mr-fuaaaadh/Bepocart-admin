import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from 'react-router-dom';

import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

const FbDefaultForm = () => {
    const { id } = useParams();
    const [state, setState] = useState({
        name: '',
        stock: '',
        category: '',
        price: '',
        description: '',
        shortDescription: '',
        file: null,
    });
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`http://127.0.0.1:8000/admin/Bepocart-product-update/${id}/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                setState(response.data.data);
                console.log("product data:", response.data.data);
            })
            .catch(error => {
                setSeverity('error');
                setMessage('Failed to fetch product data.');
                setOpen(true);
            });

        axios.get(`http://127.0.0.1:8000/admin/Bepocart-subcategories/`, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => {
                setCategories(response.data.data);
                console.log("categories data:", response.data.data);
            })
            .catch(error => {
                setSeverity('error');
                setMessage('Failed to fetch categories.');
                setOpen(true);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'salePrice' ? parseFloat(value) : value;
        setState(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate salePrice
        if (isNaN(state.salePrice)) {
            setSeverity('error');
            setMessage('Sale price must be a valid number.');
            setOpen(true);
            return;
        }
    
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('stock', state.stock);
        formData.append('category', state.category);
        formData.append('salePrice', state.salePrice); // Ensure salePrice is a valid number
        formData.append('description', state.description);
        formData.append('shortDescription', state.shortDescription); // Corrected field name
        if (state.file) {
            formData.append('image', state.file);
        }
    
        const token = localStorage.getItem('token');
    
        axios.put(`http://127.0.0.1:8000/admin/Bepocart-product-update/${id}/`, formData, {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data' // Set Content-Type for FormData
            }
        })
        .then(response => {
            setSeverity('success');
            setMessage('Product updated successfully.');
            setOpen(true);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                console.log('Token expired or unauthorized access. Redirecting to login page.');
                Navigate('/login'); 
            } else {
                setSeverity('error');
                setMessage('Failed to update product.');
                setOpen(true);
            }
        });
    };
    
    
    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            Product Edit Form
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.name}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image"
                            type="file"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setState({ ...state, file: e.target.files[0] })}
                        />
                        <TextField
                            name="stock"
                            label="Stock"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.stock}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={state.category}
                                onChange={handleChange}
                                label="Category"
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="salePrice"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.salePrice}
                            onChange={handleChange}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                            value={state.description}
                            onChange={handleChange}
                        />
                        <TextField
                            name="shortDescription"
                            label="Short Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                            value={state.short_description}
                            onChange={handleChange}
                        />

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            {/* Add any additional form fields here */}
                        </Grid>

                        <Button type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
