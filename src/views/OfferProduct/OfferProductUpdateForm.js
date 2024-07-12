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
} from "@mui/material";
import { parseISO, format } from "date-fns";

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
        offerBanner: "",
        shortDescription: "",
        offerType: "",
        offerStartDate: "",
        offerEndDate: "",
    });

    const OfferTypes = [
        { value: "50%", label: "50%" },
        { value: "BUY 1 GET 1", label: "BUY 1 GET 1" },
        { value: "FLASH SALE", label: "FLASH SALE" },
        { value: "BUY 2 GET 1", label: "BUY 2 GET 1" },
        { value: "DISCOUNT SALE", label: "DISCOUNT SALE" },
    ];

    const [offerBanners, setOfferBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchOfferBanners = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-Offer-Banners/", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setOfferBanners(response.data.data);
            } catch (error) {
                console.error("Error fetching offer banners", error);
            }
        };

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

        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/admin/Bepocart-Offer-Product-Update/${id}/`, {
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
                    offerBanner: productData.offer_banner,
                    shortDescription: productData.short_description,
                    offerType: productData.offer_type,
                    offerStartDate: format(parseISO(productData.offer_start_date), "yyyy-MM-dd'T'HH:mm"),
                    offerEndDate: format(parseISO(productData.offer_end_date), "yyyy-MM-dd'T'HH:mm"),
                });
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };

        fetchOfferBanners();
        fetchCategories();
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'offerStartDate' || name === 'offerEndDate') {
            setState({
                ...state,
                [name]: value,
            });
        } else {
            setState({
                ...state,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        formData.append("offer_banner", state.offerBanner);
        formData.append("description", state.description);
        formData.append("short_description", state.shortDescription); 
        formData.append("offer_type", state.offerType); 
        formData.append("offer_start_date", state.offerStartDate); 
        formData.append("offer_end_date", state.offerEndDate); 

        try {
            const token = localStorage.getItem("token");
            let response;
            if (id) {
                response = await axios.put(`http://127.0.0.1:8000/admin/Bepocart-Offer-Product-Update/${id}/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`,
                    },
                });
            } else {
                response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-Offer-Product/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${token}`,
                    },
                });
            }
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            setState({
                name: "",
                file: null,
                slug: "",
                category: "",
                discount: "",
                salePrice: "",
                price: "",
                description: "",
                offerBanner: "",
                shortDescription: "",
                offerType: "",
                offerStartDate: "",
                offerEndDate: "",
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

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Card variant="outlined" sx={{ p: 0 }}>
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
                                    name="image"
                                    type="file"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setState({ ...state, file: e.target.files[0] })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="slug"
                                    label="slug"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.slug}
                                    onChange={handleChange}
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
                                    name="discount"
                                    label="Discount"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.discount}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel>Offer Banner</InputLabel>
                                    <Select
                                        name="offerBanner"
                                        value={state.offerBanner}
                                        onChange={handleChange}
                                        label="Offer Banner"
                                    >
                                        {offerBanners.map((banner) => (
                                            <MenuItem key={banner.id} value={banner.id}>
                                                {banner.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel>Offer Type</InputLabel>
                                    <Select
                                        name="offerType"
                                        value={state.offerType}
                                        onChange={handleChange}
                                        label="Offer Type"
                                    >
                                        {OfferTypes.map((offer) => (
                                            <MenuItem key={offer.value} value={offer.value}>
                                                {offer.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="offerStartDate"
                                    label="Offer Start Date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.offerStartDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="offerEndDate"
                                    label="Offer End Date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={state.offerEndDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
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
            </Card>
        </div>
    );
};

export default FbDefaultForm;
