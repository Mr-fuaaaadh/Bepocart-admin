import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  TablePagination,
} from "@mui/material";
import axios from "axios";

// Replace with your actual API endpoint
const API_URL = "https://bepocart.in/admin/Bepocart-saled-products/";

const ExTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Fetch data from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Ensure token is correct
        },
      });
      const sortedProducts = response.data.total_saled_products.sort(
        (a, b) => b.total_sold - a.total_sold
      ); // Sorting products by total_sold in descending order
      setProducts(sortedProducts || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get the current products to display based on pagination
  const paginatedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Total Sold
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Budget
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>
                <Avatar
                  src={product.image || "/path/to/placeholder-image.jpg"}
                  alt={product.name}
                />
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {index + 1 + page * rowsPerPage}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.salePrice || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.salePrice || "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.pbg || "grey",
                    color: "#fff",
                  }}
                  size="small"
                  label={product.total_sold || "Unknown"}
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">
                  ${product.total_sold * product.salePrice}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
      />
    </>
  );
};

export default ExTable;
