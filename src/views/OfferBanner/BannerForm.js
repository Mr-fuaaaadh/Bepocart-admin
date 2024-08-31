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
    Snackbar,
    Alert
} from "@mui/material";

const FbDefaultForm = () => {
    const [state, setState] = useState({
        name: "",
        file: null
    });

    const [preview, setPreview] = useState(null); // State for image preview
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    const [errors, setErrors] = useState({
        name: ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file" && files.length > 0) {
            const file = files[0];
            setState({
                ...state,
                [name]: file
            });
            setPreview(URL.createObjectURL(file)); // Set the image preview URL
        } else {
            setState({
                ...state,
                [name]: value
            });
        }
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!state.name) {
            errors.name = "Name is required";
            isValid = false;
        }

        // Remove image validation
        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const formData = new FormData();
        formData.append("name", state.name);
        if (state.file) {
            formData.append("image", state.file);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("https://bepocart.in/admin/Bepocart-Offer-Banner/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`, // Ensure Bearer prefix is used
                },
            });
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            console.log("Success", response.data);
            // Clear form state after success
            setState({
                name: "",
                file: null
            });
            setPreview(null); // Clear preview after success
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
                            Offer Banner Form
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
                            error={!!errors.name}
                            helperText={errors.name}
                        />
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
                                    style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "4px" }}
                                />
                            </Box>
                        )}

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
