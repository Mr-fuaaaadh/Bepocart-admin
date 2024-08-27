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
        meta_title: "",
        meta_description: "",
        meta_keyword: "",
        alt_text: "",
        file: null,
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
        formData.append("meta_title", state.meta_title);
        formData.append("meta_description", state.meta_description);
        formData.append("meta_keyword", state.meta_keyword);
        formData.append("alt_text", state.alt_text);
        if (state.file) {
            formData.append("image", state.file);
        }
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://127.0.0.1:8000/admin/Bepocart-Banner/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`,
                },
            });
            console.log("Success", response.data);
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            setState({
                name: "",
                meta_title: "",
                meta_description: "",
                meta_keyword: "",
                alt_text: "",
                file: null,
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = '/login/';
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
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
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
                        />
                        <TextField
                            name="meta_title"
                            label="Meta Title"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.meta_title}
                            onChange={handleChange}
                        />
                        <TextField
                            name="meta_description"
                            label="Meta Description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.meta_description}
                            onChange={handleChange}
                        />
                        <TextField
                            name="meta_keyword"
                            label="Meta Keyword"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.meta_keyword}
                            onChange={handleChange}
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
