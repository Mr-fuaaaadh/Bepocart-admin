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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        name: "",
        slug: "",  // Added slug field
        alt_text: "",
        file: null,
        category: "",
    });

    const [subcategories, setSubcategories] = useState([]);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Fetch subcategories when the component mounts
        const fetchSubcategories = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-subcategories/", {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                setSubcategories(response.data.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchSubcategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setState({
            ...state,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form Validation
        if (!state.name || !state.slug || !state.subcategory) {
            setMessage("Please fill in all required fields.");
            setSeverity("error");
            setOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("slug", state.slug);  // Include slug in form data
        formData.append("alt_text", state.alt_text);
        formData.append("category", state.subcategory);
        if (state.file) {
            formData.append("image", state.file);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-Banner/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `${token}`,
                },
            });
            console.log("Success", response.data);
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            setState({
                name: "",
                slug: "",  // Reset slug field
                alt_text: "",
                file: null,
                category: "",
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/login/";
                    console.error("Unauthorized - Redirect to login page or handle accordingly.");
                } else {
                    console.error("Error Response:", error.response.data);
                }
            } else if (error.request) {
                console.error("Request Error:", error.request);
            } else {
                console.error("General Error:", error.message);
            }
            setMessage("Failed to submit the form.");
            setSeverity("error");
            setOpen(true);
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
                            Banner Form
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
                            required // Make field required
                        />
                        <TextField
                            name="slug"
                            label="Slug"  // Slug field
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.slug}
                            onChange={handleChange}
                            required // Make field required
                        />
                        <TextField
                            name="alt_text"
                            label="Alt Text"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.alt_text}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="subcategory-label">Subcategory</InputLabel>
                            <Select
                                labelId="subcategory-label"
                                name="category"
                                value={state.category}
                                onChange={handleChange}
                                label="Subcategory"
                                required // Make field required
                            >
                                {subcategories.map((subcategory) => (
                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="image"
                            type="file"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(e) => setState({ ...state, file: e.target.files[0] })}
                        />

                        <Grid container spacing={0} sx={{ mb: 2 }}>
                        </Grid>
                        <div>
                            <Button type="submit" color="primary" variant="contained">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
