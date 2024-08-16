import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SizeForm from "./SizeForm";
import EditIcon from "@mui/icons-material/Edit";


const TableBanner = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductType, setSelectedProductType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const token = localStorage.getItem('token');
    const [productType, setProductType] = useState("single");

    useEffect(() => {
        const productId = parseInt(id);
        fetchProducts(productId);
    }, [id]);
    console.log("token  :",token)

    useEffect(() => {
        const fetchData = async (productId) => {
            try {
                const featuresResponse = await axios.get(`http://127.0.0.1:9000/admin/Bepocart-product-update/${productId}/`, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                setProductType(featuresResponse.data.data.type);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(parseInt(id));
    }, [id, token]);

    const fetchProducts = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:9000/admin/Bepocart-Product-images/${productId}/`, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error("Invalid data format:", response.data);
                setError("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            } else {
                setError("Error fetching banners");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteProductId(id);
        // setSelectedProductType(productType);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:9000/admin/Bepocart-Product-images-delete/${deleteProductId}/`, {
            data: {
                    productType: productType
                },
            headers: {
                'Authorization': `${token}`,
            },
        });
            setProducts(products.filter(product => product.id !== deleteProductId));
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    
    const handleUpdateClick = (id) => {
        setSelectedProductType(productType);
        navigate(`/product-image-update/${id}/?type=${productType}`);
    };
    
    
    

    const handleCancelDelete = () => {
        setDeleteProductId(null);
        setDeleteDialogOpen(false);
    };

    const handleAddSize = (productId) => {
        setSelectedProductId(productId);
        setSelectedProductType(productType);
        setSizeDialogOpen(true);
    };

    const handleSizeAdded = (newSize) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === newSize.productId ? { ...product, sizes: [...product.sizes, newSize] } : product
            )
        );
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <>
            {products.length === 0 ? (
                <Typography>No products found.</Typography>
            ) : (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>IMAGE 1</TableCell>
                            <TableCell>IMAGE 2</TableCell>
                            <TableCell>IMAGE 3</TableCell>
                            <TableCell>IMAGE 4</TableCell>
                            <TableCell>IMAGE 5</TableCell>
                            {productType === "single" && <TableCell>STOCK</TableCell>}
                            {productType !== "single" && <TableCell>SIZE</TableCell>}
                            <TableCell>DELETE</TableCell>
                            <TableCell>UPDATE</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    {productType === "single" ? (
                                        <Box sx={{ maxWidth: "150px" }}>
                                            <Typography variant="h6" noWrap>
                                                {product.color}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Box sx={{ maxWidth: "150px" }}>
                                                <Typography variant="h6" noWrap>
                                                    {product.color}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {productType === "single" ? (
                                        <img
                                            src={`http://127.0.0.1:9000/${product.image1}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`http://127.0.0.1:9000/${product.image1}`}
                                                alt={product.name}
                                                style={{ maxWidth: "70px", maxHeight: "70px" }}
                                            />
                                        </Link>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {productType === "single" ? (
                                        <img
                                            src={`http://127.0.0.1:9000/${product.image2}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`http://127.0.0.1:9000/${product.image2}`}
                                                alt={product.name}
                                                style={{ maxWidth: "70px", maxHeight: "70px" }}
                                            />
                                        </Link>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {productType === "single" ? (
                                        <img
                                            src={`http://127.0.0.1:9000/${product.image3}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`http://127.0.0.1:9000/${product.image3}`}
                                                alt={product.name}
                                                style={{ maxWidth: "70px", maxHeight: "70px" }}
                                            />
                                        </Link>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {productType === "single" ? (
                                        <img
                                            src={`http://127.0.0.1:9000/${product.image4}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`http://127.0.0.1:9000/${product.image4}`}
                                                alt={product.name}
                                                style={{ maxWidth: "70px", maxHeight: "70px" }}
                                            />
                                        </Link>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {productType === "single" ? (
                                        <img
                                            src={`http://127.0.0.1:9000/${product.image5}`}
                                            alt={product.name}
                                            style={{ maxWidth: "70px", maxHeight: "70px" }}
                                        />
                                    ) : (
                                        <Link to={`/size-table/${product.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`http://127.0.0.1:9000/${product.image5}`}
                                                alt={product.name}
                                                style={{ maxWidth: "70px", maxHeight: "70px" }}
                                            />
                                        </Link>
                                    )}
                                </TableCell>


                                {productType === "single" ? (
                                    <TableCell>{product.stock}</TableCell>
                                ) : (
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAddSize(product.id,productType)}
                                            disabled={productType === "single"}
                                        >
                                            Add Size
                                        </Button>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteConfirmation(product.id,productType)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleUpdateClick(product.id,productType)}
                                    >
                                        Update
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Size Form Dialog */}
            <SizeForm
                open={sizeDialogOpen}
                onClose={() => setSizeDialogOpen(false)}
                productId={selectedProductId}
                onSizeAdded={handleSizeAdded}
                productTYPE={selectedProductType}
            />
        </>
    );
};

export default TableBanner;
