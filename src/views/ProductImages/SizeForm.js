import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const SizeForm = ({ open, onClose, onSizeAdded,productTYPE,productId}) => {
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState("");
    const { id } = useParams();  // Access the id parameter from the URL

    // Clear the form inputs when the dialog opens
    useEffect(() => {
        if (open) {
            setSize("");
            setQuantity("");
        }
    }, [open]);

    console.log("Product Id from useParams                          :", productId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Ensure productId is valid
        if (!id) {
            console.error("Error: Product ID not found");
            return;
        }

        try {
            console.log("Sending data:", { size, stock: quantity, product: parseInt(id) });
            const response = await axios.post(`http://127.0.0.1:9000/admin/Bepocart-product-varient/${productId}/`, {
                size,
                stock: quantity,
                product: parseInt(id),
                "productType" : productTYPE
            }, {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            console.log("Response data:", response.data);
            onSizeAdded(response.data);
            onClose();
        } catch (error) {
            console.error("Error adding size:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Size and Quantity</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Size"
                        type="text"
                        fullWidth
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SizeForm;
