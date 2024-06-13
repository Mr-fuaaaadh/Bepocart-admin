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
    Checkbox,
    FormControlLabel,
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        sizes: [], // State for multiple sizes
        color: "",
    });

    const { id } = useParams();

    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [features, setFeatures] = useState([]);
    

    const handleChange = (e) => {
        const { name, value, files, checked } = e.target;
    
        if (e.target.type === "checkbox") {
            if (checked) {
                setState({
                    ...state,
                    sizes: [...state.sizes, name], // Add selected size
                });
            } else {
                setState({
                    ...state,
                    sizes: state.sizes.filter((size) => size !== name), // Remove deselected size
                });
            }
        } else {
            setState({
                ...state,
                [name]: files ? files[0] : value,
            });
        }
    };

    console.log(state,"selected state");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/admin/Bepocart-product-size-view/");
                // Filter out the error message if present
                const filteredFeatures = response.data.filter(feature => feature !== "This list may not be empty.");
                setFeatures(filteredFeatures);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one size is selected
    if (state.sizes.length === 0 || state.sizes[0] === "This list may not be empty.") {
        setMessage("Please select at least one size.");
        setSeverity("error");
        setOpen(true);
        return; // Prevent form submission
    }

    const formData = new FormData();
    // Ensure sizes are appended as a comma-separated string
    formData.append("sizes", state.sizes.join(","));
    formData.append("color", state.color);
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);
    formData.append("image4", state.image4);
    formData.append("image5", state.image5);

    try {
        const response = await axios.post(`http://127.0.0.1:8000/admin/Bepocart-Product-image-add/${id}/`, formData, {
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
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null,
            sizes: [], // State for multiple sizes
            color: "",
        });
        // Navigate to another page if needed
        // navigate('/some-path');
    } catch (error) {
        setMessage("Failed to submit the form.");
        setSeverity("error");
        setOpen(true);
        console.error("Error", error.response ? error.response.data : error.message);
    }
};

    

    const handleSizeChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setState({
                ...state,
                sizes: [...state.sizes, name],
            });
        } else {
            setState({
                ...state,
                sizes: state.sizes.filter((size) => size !== name),
            });
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
                            name="color"
                            label="Color"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.color}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image1"
                            variant="outlined"
                            type="file"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image2"
                            variant="outlined"
                            type="file"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image3"
                            variant="outlined"
                            type="file"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image4"
                            variant="outlined"
                            type="file"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />
                        <TextField
                            name="image5"
                            variant="outlined"
                            type="file"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />


                        <Typography variant="h6" gutterBottom>
                            Sizes:
                        </Typography>
                        <Grid container spacing={2}>
                            {features.map((size) => (
                                <Grid item xs={6} sm={4} key={size.id}>
                                    <FormControlLabel
                                        control={<Checkbox checked={state.sizes.includes(size.name)} onChange={handleSizeChange} name={size.id} />}
                                        label={size.name}
                                    />
                                </Grid>
                            ))}
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
