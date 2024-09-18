import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import logo from '../../../src/assets/images/bepocart.png';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoiceHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
});

const InvoiceDetails = styled(Box)({
    marginBottom: '20px',
});

const InvoiceTable = styled(TableContainer)({
    marginBottom: '20px',
});

const InvoiceFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
});

const FullScreenBox = styled(Box)({
    width: '100%',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
});


const Invoice = () => {
    const { order_id } = useParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/admin/Bepocart-Order-Bill/${order_id}/`);
                setOrderData(response.data);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [order_id]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    // Calculate COD charge
    const codCharge = orderData.data.payment_method === 'COD' ? 40.00 : 0.00;

    // Calculate shipping charge
    const shippingCharge = parseFloat(orderData.data.total_amount) < 500 ? 60.00 : 0.00;

    // Calculate total amount
    const totalAmount = parseFloat(orderData.data.total_amount);

    // Function to handle PDF download
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Ensure this matches your CORS policy
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = src;
        });
    };


    const downloadInvoice = async () => {
        const input = document.getElementById('invoice-container');
        if (!input) {
            console.error('Invoice container not found');
            return;
        }

        try {
            // Ensure all images are loaded
            const images = Array.from(input.getElementsByTagName('img'));
            await Promise.all(images.map(img => loadImage(img.src)));

            // Generate the PDF
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Width in mm
            const pageHeight = 295; // Height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${orderData.data.order_id}_invoice.pdf`);
        } catch (error) {
            console.error('Error creating PDF:', error.message || error);
        }
    };


    const printInvoice = () => {
        const printContent = document.getElementById('invoice-container').innerHTML;

        const printWindow = window.open('', '', 'height=800,width=800');
        printWindow.document.write('<html><head><title>Invoice</title>');
        printWindow.document.write(`
            <style>
                @media print {
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        box-sizing: border-box;
                    }
                    #invoice-container {
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .invoice-header, .invoice-footer {
                        margin: 0;
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .invoice-header {
                        border-bottom: 2px solid #000;
                    }
                    .invoice-footer {
                        border-top: 2px solid #000;
                        text-align: right;
                    }
                    .invoice-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        text-align: left;
                    }
                    .invoice-table th, .invoice-table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    .invoice-table th {
                        background-color: #f4f4f4;
                    }
                    img {
                        max-width: 100px;
                        height: auto;
                        object-fit: cover;
                    }
                    .page-break {
                        page-break-before: always;
                    }
                    button {
                        display: none;
                    }
                }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');

        printWindow.document.close();
        printWindow.focus();
        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };
    };





    return (
        <FullScreenBox>
            <div id="invoice-container">
                <Card variant="outlined" style={{ height: '100%' }}>
                    <CardContent style={{ height: '100%' }}>
                        <InvoiceHeader className='invoice-header'>
                            <Box>
                                <Typography variant="h4">INVOICE</Typography>
                                <Typography variant="body2" color="primary">{orderData.data.status}</Typography>
                            </Box>
                            <Box>
                                <img src={logo} alt="Company Logo" style={{ height: '100px' }} />
                            </Box>
                        </InvoiceHeader>
                        <InvoiceDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6">DATE</Typography>
                                    <Typography variant="body2">{orderData.data.created_at}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">INVOICE NO</Typography>
                                    <Typography variant="body2">{orderData.data.order_id}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">INVOICE FROM</Typography>
                                    <Typography variant="body2">
                                        Name: Bepocart
                                    </Typography>
                                    <Typography variant="body2">
                                        Address: Willington Island , 256314 , Valav thirinj moonnanmathe building
                                    </Typography>
                                    <Typography variant="body2">Email: Bepocart@gmail.com</Typography>
                                    <Typography variant="body2">Phone: 123456789</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">INVOICE TO</Typography>
                                    <Typography variant="body2">
                                        Name: {orderData.data.customerName} {orderData.data.lastName}
                                    </Typography>
                                    <Typography variant="body2">
                                        Address: {orderData.data.address}, {orderData.data.city}, {orderData.data.state}, {orderData.data.pincode}
                                    </Typography>
                                    <Typography variant="body2">Email: {orderData.data.email}</Typography>
                                    <Typography variant="body2">Phone: {orderData.data.phone}</Typography>
                                </Grid>
                            </Grid>
                        </InvoiceDetails>
                        <InvoiceTable component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SR.</TableCell>
                                        <TableCell>PRODUCT IMAGE</TableCell>
                                        <TableCell>PRODUCT TITLE</TableCell>
                                        <TableCell>QUANTITY</TableCell>
                                        <TableCell>ITEM PRICE</TableCell>
                                        <TableCell>AMOUNT</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderData.order_items.map(({ productImage, productName, color, size, quantity, price }, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={productImage}
                                                    alt={`${productName} - ${color} - ${size}`}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            </TableCell>
                                            <TableCell>{productName} - {color} - {size}</TableCell>
                                            <TableCell>{quantity}</TableCell>
                                            <TableCell>₹{price}</TableCell>
                                            <TableCell>
                                                <Typography color="error" style={{ fontWeight: 'bold' }}>
                                                    ₹{(quantity * parseFloat(price)).toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </InvoiceTable>
                        <InvoiceFooter>
                            <Box>
                                <Typography variant="h6">PAYMENT METHOD</Typography>
                                <Typography variant="body2">{orderData.data.payment_method}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">COD CHARGE</Typography>
                                <Typography variant="body2">₹{codCharge.toFixed(2)}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">SHIPPING COST</Typography>
                                <Typography variant="body2">₹{shippingCharge.toFixed(2)}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">TOTAL AMOUNT</Typography>
                                <Typography variant="h6" color="error" style={{ fontWeight: 'bold' }}>₹{totalAmount.toFixed(2)}</Typography>
                            </Box>
                        </InvoiceFooter>
                    </CardContent>
                </Card>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={downloadInvoice}>
                    Download Invoice
                </Button>
                <Button variant="contained" color="secondary" onClick={printInvoice}>
                    Print Invoice
                </Button>
            </Box>
        </FullScreenBox>
    );
};

export default Invoice;
