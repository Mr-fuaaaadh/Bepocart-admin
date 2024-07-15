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
    OutlinedInput,
    Chip,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { format } from 'date-fns';

const FbDefaultForm = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        buy: "BUY",
        buy_value: "",
        amount: "",
        get: "",
        method: "",
        discount_percentage: "",
        offer_products: [],
        exclude_products: [],
        offer_category: [],
        excluded_offer_category: [],
        start_date: "",
        end_date: "",
        not_allowed_coupons: [],
        message: "",
        shipping_charge: "",
        coupon_user_limit: "",
        coupon_use_order_limit: "",
        eligible_products: true,
    });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [percentageValue, setPercentageValue] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admin/Bepocart-products/", {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setProducts(response.data.data);
            console.log("Products   :", response.data.data)

        });

        axios.get("http://127.0.0.1:8000/admin/Bepocart-subcategories/", {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setCategories(response.data.data);
            console.log("Category   :", response.data.data)

        });

        axios.get("http://127.0.0.1:8000/admin/Bepocart-promotion-coupen-views/", {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setCoupons(response.data);
            console.log("coupon   :", response.data)
        });

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'start_date' || name === 'end_date') {
            const formattedValue = format(new Date(value), 'yyyy-MM-dd');
            setFormData((prevState) => ({
                ...prevState,
                [name]: formattedValue,
            }));
        }
        // Reset fields based on method
        if (name === "method") {
            if (value === "FREE") {
                setFormData((prevState) => ({
                    ...prevState,
                    discount_percentage: "",
                }));
            } else if (value === "% OFF") {
                setFormData((prevState) => ({
                    ...prevState,
                    get: "",
                }));
            }
        }

        if (name === "buy") {
            if (value === "BUY") {
                setFormData((prevState) => ({
                    ...prevState,
                    buy_value: "",
                }));
            } else if (value === "SPEND") {
                setFormData((prevState) => ({
                    ...prevState,
                    amount: "",
                }));
            }
        }
    };
    const handleCheckboxChange = (event) => {
        setFormData({ ...formData, eligible_products: event.target.checked });
    };

    const handleMultipleChange = (event, field) => {
        setFormData({ ...formData, [field]: event.target.value });
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
                            Bogo
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="name"
                                    label="TITLE"

                                    variant="outlined"
                                    fullWidth
                                    value={formData.name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" component="h1">
                                    discount_percentage
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="coupon-type-label">OFFER TYPE</InputLabel>
                                    <Select
                                        labelId="coupon-type-label"
                                        id="buy"
                                        name="buy"
                                        value={formData.buy}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Coupon Type" />}
                                    >
                                        <MenuItem value="BUY">BUY</MenuItem>
                                        <MenuItem value="SPEND">SPEND</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {formData.buy === 'BUY' ? (
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        name="buy_value"
                                        label="BUY"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.buy_value}
                                        onChange={handleChange}
                                        type="number"
                                        inputProps={{ min: 0, step: 1 }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            ) : null}

                            {formData.buy !== 'BUY' ? (
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        name="amount"
                                        label="Amount"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.amount}
                                        onChange={handleChange}
                                        type="number"
                                        inputProps={{ min: 0, step: 1 }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            ) : null}

                            {formData.method !== "% OFF" && (
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        name="get"
                                        label="Get"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.get}
                                        onChange={handleChange}
                                        type="number"
                                        inputProps={{ min: 0, step: 1 }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            )}
                            {formData.method === "% OFF" && (
                                <Grid item xs={3}>
                                    <TextField
                                        name="discount_percentage"
                                        label="discount_percentage"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.discount_percentage}
                                        onChange={handleChange}
                                        type="number"
                                        inputProps={{ min: 0, step: 1 }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="method-label">METHOD</InputLabel>
                                    <Select
                                        labelId="method-label"
                                        id="method"
                                        name="method"
                                        value={formData.method}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Method" />}
                                    >
                                        <MenuItem value="FREE">FREE</MenuItem>
                                        <MenuItem value="% OFF">% OFF</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <Typography variant="h5" component="h1">
                                    ELIGIBLE PRODUCTS
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>

                                    <InputLabel id="offer-product-label">OFFER PRODUCT</InputLabel>
                                    <Select
                                        labelId="offer-product-label"
                                        id="offer_products"
                                        multiple
                                        value={formData.offer_products}
                                        onChange={(e) => handleMultipleChange(e, "offer_products")}
                                        input={<OutlinedInput label="Offer Product" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={products.find(p => p.id === value)?.name || value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {products.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="offer-excluded-products-label">EXCLUDED OFFER PRODUCTS</InputLabel>
                                    <Select
                                        labelId="offer-excluded-products-label"
                                        id="exclude_products"
                                        multiple
                                        value={formData.exclude_products}
                                        onChange={(e) => handleMultipleChange(e, "exclude_products")}
                                        input={<OutlinedInput label="Excluded Offer Products" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={products.find(p => p.id === value)?.name || value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {products.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="offer-category-label">OFFER CATEGORY</InputLabel>
                                    <Select
                                        labelId="offer-category-label"
                                        id="offer_category"
                                        multiple
                                        value={formData.offer_category}
                                        onChange={(e) => handleMultipleChange(e, "offer_category")}
                                        input={<OutlinedInput label="Offer Category" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={categories.find(p => p.id === value)?.name || value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {/* Replace with actual categories */}
                                        {categories.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="excluded-offer-category-label">EXCLUDED OFFER CATEGORY</InputLabel>
                                    <Select
                                        labelId="excluded-offer-category-label"
                                        id="excluded_offer_category"
                                        multiple
                                        value={formData.excluded_offer_category}
                                        onChange={(e) => handleMultipleChange(e, "excluded_offer_category")}
                                        input={<OutlinedInput label="Excluded Offer Category" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={categories.find(p => p.id === value)?.name || value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {/* Replace with actual categories */}
                                        {categories.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Card>
                                <CardContent>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" component="h1">
                                                    discount_percentageED PRODUCTS
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={formData.eligible_products}
                                                            onChange={handleCheckboxChange}
                                                            name="eligible_products"
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Eligible Products"
                                                />
                                            </Grid>

                                            {!formData.eligible_products && (
                                                <>
                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                                            <InputLabel id="offer-product-label">OFFER PRODUCT</InputLabel>
                                                            <Select
                                                                labelId="offer-product-label"
                                                                id="offer_products"
                                                                multiple
                                                                value={formData.offer_products}
                                                                onChange={(e) => handleMultipleChange(e, "offer_products")}
                                                                input={<OutlinedInput label="Offer Product" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={products.find(p => p.id === value)?.name || value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                            >
                                                                {products.map((product) => (
                                                                    <MenuItem key={product.id} value={product.id}>
                                                                        {product.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                                            <InputLabel id="offer-excluded-products-label">EXCLUDED OFFER PRODUCTS</InputLabel>
                                                            <Select
                                                                labelId="offer-excluded-products-label"
                                                                id="exclude_products"
                                                                multiple
                                                                value={formData.exclude_products}
                                                                onChange={(e) => handleMultipleChange(e, "exclude_products")}
                                                                input={<OutlinedInput label="Excluded Offer Products" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={products.find(p => p.id === value)?.name || value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                            >
                                                                {products.map((product) => (
                                                                    <MenuItem key={product.id} value={product.id}>
                                                                        {product.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                                            <InputLabel id="offer-category-label">OFFER CATEGORY</InputLabel>
                                                            <Select
                                                                labelId="offer-category-label"
                                                                id="offer_category"
                                                                multiple
                                                                value={formData.offer_category}
                                                                onChange={(e) => handleMultipleChange(e, "offer_category")}
                                                                input={<OutlinedInput label="Offer Category" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={categories.find(p => p.id === value)?.name || value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                            >
                                                                {/* Replace with actual categories */}
                                                                {categories.map((product) => (
                                                                    <MenuItem key={product.id} value={product.id}>
                                                                        {product.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                                            <InputLabel id="excluded-offer-category-label">EXCLUDED OFFER CATEGORY</InputLabel>
                                                            <Select
                                                                labelId="excluded-offer-category-label"
                                                                id="excluded_offer_category"
                                                                multiple
                                                                value={formData.excluded_offer_category}
                                                                onChange={(e) => handleMultipleChange(e, "excluded_offer_category")}
                                                                input={<OutlinedInput label="Excluded Offer Category" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={categories.find(p => p.id === value)?.name || value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                            >
                                                                {/* Replace with actual categories */}
                                                                {categories.map((product) => (
                                                                    <MenuItem key={product.id} value={product.id}>
                                                                        {product.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </>
                                            )}

                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>



                            <Grid item xs={12}>
                                <Typography variant="h5" component="h1">
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="start_date"
                                    label="START DATE"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="end_date"
                                    label="END DATE"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    type="date"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" component="h1">
                                    RESTRICTION
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="excluded-offer-category-label">COUPONS</InputLabel>
                                    <Select
                                        labelId="excluded-offer-category-label"
                                        id="excluded_offer_category"
                                        multiple
                                        value={formData.excluded_offer_category}
                                        onChange={(e) => handleMultipleChange(e, "excluded_offer_category")}
                                        input={<OutlinedInput label="Excluded Offer Category" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={coupons.find(p => p.id === value)?.code || value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {/* Replace with actual categories */}
                                        {coupons.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                {product.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    label="MESSAGE"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.message}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="shipping_charge"
                                    label="SHIPPING CHARGE"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.shipping_charge}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="coupon_user_limit"
                                    label="COUPON USER LIMIT"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.coupon_user_limit}
                                    onChange={handleChange}
                                    type="number"
                                    inputProps={{ min: 0, step: 1 }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="coupon_use_order_limit"
                                    label="USER ORDER LIMIT"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.coupon_use_order_limit}
                                    onChange={handleChange}
                                    type="number"
                                    inputProps={{ min: 0, step: 1 }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
};

export default FbDefaultForm;
