import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        name: "",
        file: null,
        slug: "",
        category: "",
        type: "single", // Default to "single"
        discount: "",
        salePrice: "",
        price: "",
        description: "",
        shortDescription: "",
        offerStartDate: "",
        offerEndDate: "",
    });

    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [slugError, setSlugError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-subcategories/", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                setSeverity("error");
                setMessage("Failed to fetch categories.");
                setOpen(true);
            }
        };
        fetchCategories();
    }, []);

    const validateSlug = (slug) => {
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(slug)) {
            return "Invalid slug. Only lowercase letters, numbers, and hyphens are allowed.";
        }
        return "";
    };

    const calculateDiscount = (price, salePrice) => {
        const priceFloat = parseFloat(price);
        const salePriceFloat = parseFloat(salePrice);

        if (!isNaN(priceFloat) && !isNaN(salePriceFloat) && priceFloat > 0) {
            const discount = ((priceFloat - salePriceFloat) / priceFloat) * 100;
            return discount.toFixed(2);
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "slug") {
            const lowerCaseSlug = value.toLowerCase();
            setSlugError(validateSlug(lowerCaseSlug));
            setState({
                ...state,
                [name]: lowerCaseSlug,
            });
        } else {
            let newState = {
                ...state,
                [name]: files ? files[0] : value,
            };

            if (name === "file" && files.length > 0) {
                const file = files[0];
                setPreview(URL.createObjectURL(file));
                newState.file = file;
            }

            if (name === "price" || name === "salePrice") {
                const discount = calculateDiscount(newState.price, newState.salePrice);
                newState = {
                    ...newState,
                    discount,
                };
            }
            if (name === "shortDescription" && value.length > 255) {
                setMessage("Short description cannot exceed 255 characters.");
                setSeverity("error");
                setOpen(true);
                return;
            }

            setState(newState);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (slugError) {
            setSeverity("error");
            setMessage(slugError);
            setOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("name", state.name);
        if (state.file) {
            formData.append("image", state.file);
        }
        formData.append("slug", state.slug);
        formData.append("category", state.category);
        formData.append("type", state.type); // Append product type to form data
        formData.append("price", state.price);
        formData.append("salePrice", state.salePrice);
        formData.append("discount", state.discount);
        formData.append("description", state.description);
        formData.append("short_description", state.shortDescription);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-product/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`,
                },
            });
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            setState({
                name: "",
                file: null,
                slug: "",
                category: "",
                type: "single", // Reset to default
                discount: "",
                salePrice: "",
                price: "",
                description: "",
                shortDescription: "",
            });
            setPreview(null);
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

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            Offer Product Form
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="file"
                                    type="file"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={handleChange}
                                />
                                {preview && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2">Image Preview:</Typography>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "4px" }}
                                        />
                                    </Box>
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
                                    error={!!slugError}
                                    helperText={slugError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
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
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel>Product Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={state.type}
                                        onChange={handleChange}
                                        label="Product Type"
                                    >
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="variant">Variant</MenuItem>
                                    </Select>
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
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </CardContent>
        </div>
    );
};

export default FbDefaultForm;
