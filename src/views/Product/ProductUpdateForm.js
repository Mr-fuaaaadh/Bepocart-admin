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
    Grid,
    Alert,
    Snackbar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";

const FbDefaultForm = () => {
    const { id } = useParams();

    const [state, setState] = useState({
        name: "",
        file: null,
        slug: "",
        category: "",
        discount: "",
        salePrice: "",
        price: "",
        description: "",
        shortDescription: "",
        type: "",
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null); // Add state for image preview

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://bepocart.in/admin/Bepocart-subcategories/", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                handleApiError("Failed to fetch categories.", error);
            }
        };

        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`https://bepocart.in/admin/Bepocart-product-update/${id}/`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const productData = response.data.data;

                setState({
                    name: productData.name,
                    slug: productData.slug,
                    category: productData.category,
                    salePrice: productData.salePrice,
                    price: productData.price,
                    discount: productData.discount,
                    description: productData.description,
                    shortDescription: productData.short_description,
                    type: productData.type,
                });

                // Set image preview if an image is already associated with the product
                if (productData.image) {
                    setImagePreview(productData.image);
                }
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };

        fetchCategories();
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const calculateDiscount = (price, salePrice) => {
        const priceFloat = parseFloat(price);
        const salePriceFloat = parseFloat(salePrice);

        if (!isNaN(priceFloat) && !isNaN(salePriceFloat) && priceFloat > 0) {
            const discount = ((priceFloat - salePriceFloat) / priceFloat) * 100;
            return discount.toFixed(2);
        }
        return "";
    };

    const validateForm = () => {
        let formErrors = {};

        if (!state.name) {
            formErrors.name = "Name is required";
        }
        if (!state.slug) {
            formErrors.slug = "Slug is required";
        }
        if (!state.category) {
            formErrors.category = "Category is required";
        }
        if (!state.price) {
            formErrors.price = "Price is required";
        }
        if (!state.salePrice) {
            formErrors.salePrice = "Sale price is required";
        }
        if (!state.description) {
            formErrors.description = "Description is required";
        }
        if (!state.shortDescription) {
            formErrors.shortDescription = "Short description is required";
        }
        if (!state.type) {
            formErrors.type = "Type is required";
        }

        return formErrors;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        let newState = {
            ...state,
            [name]: files ? files[0] : value,
        };

        if (name === "slug") {
            const lowerCaseSlug = value.toLowerCase();
            newState = {
                ...newState,
                slug: lowerCaseSlug,
            };
        }

        if (name === "price" || name === "salePrice") {
            const discount = calculateDiscount(newState.price, newState.salePrice);
            newState = {
                ...newState,
                discount,
            };
        }

        if (name === "shortDescription" && value.length > 5000) {
            handleValidationMessage("Short description cannot exceed 5000 characters.");
            return;
        }

        if (name === "file" && files) {
            const file = files[0];
            newState = {
                ...newState,
                file,
            };

            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }

        setState(newState);
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", state.name);
            if (state.file) {
                formData.append("image", state.file);
            }
            formData.append("slug", state.slug);
            formData.append("category", state.category);
            formData.append("price", state.price);
            formData.append("salePrice", state.salePrice);
            formData.append("discount", state.discount);
            formData.append("description", state.description);
            formData.append("short_description", state.shortDescription);
            formData.append("type", state.type);

            const token = localStorage.getItem("token");
            let response;
            if (id) {
                response = await axios.put(`https://bepocart.in/admin/Bepocart-product-update/${id}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`,
                    },
                });
            } else {
                response = await axios.post("https://bepocart.in/admin/Bepocart-product/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`,
                    },
                });
            }

            handleSuccessMessage("Form submitted successfully!");
            setState({
                name: "",
                file: null,
                slug: "",
                category: "",
                discount: "",
                salePrice: "",
                price: "",
                description: "",
                shortDescription: "",
                type: "",
            });
            setErrors({});
            setImagePreview(null); // Reset image preview
        } catch (error) {
            handleApiError("Failed to submit the form.", error);
        }
    };

    const handleApiError = (message, error) => {
        console.error(message, error);
        setMessage(message);
        setSeverity("error");
        setOpen(true);
    };

    const handleSuccessMessage = (message) => {
        setMessage(message);
        setSeverity("success");
        setOpen(true);
    };

    const handleValidationMessage = (message) => {
        setMessage(message);
        setSeverity("warning");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {id ? "Edit Product" : "Add Product"}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="file" // Change to "file" to match state
                                    onChange={handleChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload Image
                                    </Button>
                                </label>
                                {imagePreview && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ maxWidth: "20%", height: "auto" }}
                                        />
                                    </Box>
                                )}
                                {errors.file && (
                                    <Typography variant="body2" color="error">
                                        {errors.file}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="slug"
                                    label="Slug"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.slug}
                                    onChange={handleChange}
                                    error={!!errors.slug}
                                    helperText={errors.slug}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} error={!!errors.category}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={state.category}
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.category}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.price}
                                    onChange={handleChange}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="salePrice"
                                    label="Sale Price"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.salePrice}
                                    onChange={handleChange}
                                    error={!!errors.salePrice}
                                    helperText={errors.salePrice}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="discount"
                                    label="Discount"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.discount}
                                    onChange={handleChange}
                                    error={!!errors.discount}
                                    helperText={errors.discount}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} error={!!errors.type}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={state.type}
                                        onChange={handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value="single">Single Product</MenuItem>
                                        <MenuItem value="variant">Variant Product</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.type}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
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
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="shortDescription"
                                    label="Short Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    sx={{ mb: 2 }}
                                    value={state.shortDescription}
                                    onChange={handleChange}
                                    error={!!errors.shortDescription}
                                    helperText={errors.shortDescription}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
