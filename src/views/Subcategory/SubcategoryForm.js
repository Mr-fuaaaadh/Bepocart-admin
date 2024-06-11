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
    InputLabel,
    FormControl,
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        name: "",
        file: null,
        mainCategory: "",
    });

    const [mainCategories, setMainCategories] = useState([]);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true); // New state for loading indicator

    useEffect(() => {
        fetchMainCategories();
    }, []);

    const fetchMainCategories = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-categories/");
            setMainCategories(response.data.data || []);
            setLoading(false); // Set loading to false after data is fetched
            console.log(response)
        } catch (error) {
            console.error("Error fetching main categories:", error);
            setLoading(false); // Set loading to false even if fetch fails
        }
    };

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
        formData.append("mainCategory", state.mainCategory);
        if (state.file) {
            formData.append("image", state.file);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-subcategory/", formData, {
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
                mainCategory: "",
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
                            Sub Category Form
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    {loading ? ( // Show loading indicator while data is being fetched
                        <Typography>Loading...</Typography>
                    ) : (
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
                                fullWidth
                                id="standard-select-number"
                                variant="outlined"
                                select
                                name = "category"
                                label="Category"
                                value={state.mainCategory}
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                }}
                            >
                                {mainCategories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Grid container spacing={0} sx={{ mb: 2 }}>
                            </Grid>
                            <div>
                                <Button type="submit" color="primary" variant="contained">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default FbDefaultForm;
