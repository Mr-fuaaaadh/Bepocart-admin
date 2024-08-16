import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
    });

    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [features, setFeatures] = useState([]);
    const [errors, setErrors] = useState({
        color: "",
        images: "",
    });
    const [productType, setProductType] = useState("single"); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch features
                const featuresResponse = await axios.get(`http://127.0.0.1:9000/admin/Bepocart-product-update/${id}/`, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                setFeatures(featuresResponse.data);
                setProductType(featuresResponse.data.data.type);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setState({
            ...state,
            [name]: files ? files[0] : value,
        });
    };

    const validateForm = () => {
        const errors = {};

        // Validate color
        if (!state.color.trim()) {
            errors.color = "Color is required.";
        }

        // Validate images
        if (!state.image1 && !state.image2 && !state.image3 && !state.image4 && !state.image5) {
            errors.images = "At least one image is required.";
        }

        // Validate stock if product type is single
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
        if (productType === "single") {
            formData.append("stock", state.stock);
        }
        formData.append("image1", state.image1);
        formData.append("image2", state.image2);
        formData.append("image3", state.image3);
        formData.append("image4", state.image4);
        formData.append("image5", state.image5);

        try {
            const response = await axios.post(`http://127.0.0.1:9000/admin/Bepocart-Product-image-add/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`,
                },
            });
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            console.log("Success", response.data);
            setState({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
                color: "",
                stock: "",
            });
        } catch (error) {
            setMessage("Failed to submit the form.");
            setSeverity("error");
            setOpen(true);
            console.error("Error", error.response ? error.response.data : error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createImagePreviewUrl = (file) => {
        return file ? URL.createObjectURL(file) : null;
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
                    <form onSubmit={handleSubmit}>
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
                        
                        <Button type="submit" color="primary" variant="contained" >
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
