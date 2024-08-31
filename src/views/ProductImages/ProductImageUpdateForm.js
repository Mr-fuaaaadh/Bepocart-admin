import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        color: "",
        stock: "",
        product: 0,
    });

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productType = queryParams.get('type');
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
        color: "",
        images: "",
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProductData = async () => {
            if (id && productType) {
                try {
                    const response = await axios.get(`https://bepocart.in/admin/Bepocart-Product-images-update/${id}/`, {
                        params: { productType },
                        headers: {
                            'Authorization': `${token}`,
                        },
                    });
                    const product = response.data.data;
                    setState({
                        image1: product.image1 || null,
                        image2: product.image2 || null,
                        image3: product.image3 || null,
                        image4: product.image4 || null,
                        image5: product.image5 || null,
                        color: product.color || "",
                        stock: productType === "single" ? product.stock : "",
                        product: product.product || 0,
                    });
                } catch (error) {
                    console.error('Error fetching product data:', error);
                    setMessage("Failed to fetch product data.");
                    setSeverity("error");
                    setOpen(true);
                }
            }
        };

        fetchProductData();
    }, [id, productType, token]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setState({
            ...state,
            [name]: files ? files[0] : value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!state.color.trim()) {
            errors.color = "Color is required.";
        }

        if (!state.image1 && !state.image2 && !state.image3 && !state.image4 && !state.image5) {
            errors.images = "At least one image is required.";
        }

        if (productType === "single" && (!Number.isInteger(Number(state.stock)) || Number(state.stock) <= 0)) {
            errors.stock = "Stock must be a positive integer.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("color", state.color);
        formData.append("productType", productType);
        formData.append("product", state.product.toString());

        if (productType === "single") {
            formData.append("stock", state.stock);
        }

        for (let i = 1; i <= 5; i++) {
            const file = state[`image${i}`];
            if (file instanceof Blob) {
                formData.append(`image${i}`, file, file.name);
            }
        }

        try {
            await axios.put(`https://bepocart.in/admin/Bepocart-Product-images-update/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`,
                },
            });
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            setState({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
                color: "",
                stock: "",
                product: 0,
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage("Failed to submit the form.");
            setSeverity("error");
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createImagePreviewUrl = (file) => {
        if (!file) return null;
        return typeof file === "string" ? file : URL.createObjectURL(file);
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
                            Product Form
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <TextField
                            name="color"
                            label="Name / Color / Teeth"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.color}
                            onChange={handleChange}
                            error={!!errors.color}
                            helperText={errors.color}
                        />
                        {productType === "single" && (
                            <TextField
                                name="stock"
                                label="Stock"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={state.stock}
                                onChange={handleChange}
                                error={!!errors.stock}
                                helperText={errors.stock}
                            />
                        )}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={`image${i}`} style={{ marginBottom: '20px' }}>
                                <TextField
                                    name={`image${i}`}
                                    variant="outlined"
                                    type="file"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={handleChange}
                                    error={!!errors.images}
                                    helperText={i === 1 ? errors.images : ""}
                                    inputProps={{ accept: "image/*" }}
                                />
                                {state[`image${i}`] && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2">Preview:</Typography>
                                        <img
                                            src={createImagePreviewUrl(state[`image${i}`])}
                                            alt={`Image ${i} preview`}
                                            style={{ maxWidth: '100px', height: 'auto', marginRight: '10px' }}
                                        />
                                    </Box>
                                )}
                            </div>
                        ))}
                        
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
