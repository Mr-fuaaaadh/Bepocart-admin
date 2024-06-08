import React, { useState } from "react";
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
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        name: "",
        file: null,
        stock: "",
        category: "",
        price: "",
        description: "",
        shortDescription: "",
    });

    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setState({
            ...state,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", state.name);
        if (state.file) {
            formData.append("image", state.file);
        }
        formData.append("stock", state.stock);
        formData.append("category", state.category);
        formData.append("salePrice", state.price);
        formData.append("description", state.description);
        formData.append("short_description", state.shortDescription);

        try {
            const response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-product/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            console.log("Success", response.data);
            // Clear form state after success
            setState({
                name: "",
                file: null,
                stock: "",
                category: "",
                price: "",
                description: "",
                shortDescription: "",
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
                        <TextField
                            name="category"
                            label="Category"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.category}
                            onChange={handleChange}
                        />
                        <TextField
                            name="salePrice"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.price}
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
                            value={state.shortDescription}
                            onChange={handleChange}
                        />

                        <Grid container spacing={2} sx={{ mb: 2 }}>
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
