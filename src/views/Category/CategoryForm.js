import React, { useReducer, useState } from "react";
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

const initialState = {
    name: "",
    slug: "",
    file: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

const FbDefaultForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        dispatch({
            type: "SET_FIELD",
            field: name,
            value: files ? files[0] : value,
        });
    };

    const validateForm = () => {
        const { name, slug, file } = state;
        if (!name || !slug || !file) {
            const errorMsg = !name
                ? "Name field cannot be empty."
                : !slug
                ? "Slug field cannot be empty."
                : "Image file must be selected.";
            setMessage(errorMsg);
            setSeverity("error");
            setOpen(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://127.0.0.1:8000/admin/Bepocart-category/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                }
            );
            setMessage("Form submitted successfully!");
            setSeverity("success");
            setOpen(true);
            console.log("Success", response.data);
            dispatch({ type: "RESET" }); // Reset form after success
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to submit the form.";
            setMessage(errorMsg);
            setSeverity("error");
            setOpen(true);
            console.error("Error", error.response || error.message);
        }
    };

    const handleClose = () => setOpen(false);

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
                            Category Form
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
                            name="slug"
                            label="Slug"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={state.slug}
                            onChange={handleChange}
                        />
                        <TextField
                            name="file"
                            type="file"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                        />

                        <Grid container spacing={0} sx={{ mb: 2 }}>
                            {/* Additional form elements can go here */}
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
