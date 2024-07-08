import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TableBanner from "./Table.js";

const ProductTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = () => {
    setSubmittedQuery(searchQuery);
  };

  return (
    <Box position="relative">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Offer Product Table</Typography>
          <Box
            sx={{
              overflowX: "auto",
              overflowY: "auto",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              maxHeight: "800px",
              display: "flex",
              alignItems: "center",
              gap: 2, // Add some space between the input and button
              mb: 2,  // Add some margin at the bottom
            }}
          >
            <TextField
              label="Search"
              placeholder="Search by username / date"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: "300px", // Adjust the width
                height: "40px", // Adjust the height
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<SearchIcon />}
              sx={{
                height: "40px", // Match the height of the input field
              }}
            >
              Submit
            </Button>
          </Box>
          <Box
            sx={{
              overflowX: "auto",
              overflowY: "auto",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              maxHeight: "800px",
            }}
          >
            <TableBanner searchQuery={submittedQuery} />
          </Box>
        </CardContent>
      </Card>
      <Button
        component={RouterLink}
        to="/offer-product-form/"
        variant="contained"
        color="success"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          mt: 2,
          ml: 125,
        }}
      >
        Add product
      </Button>
    </Box>
  );
};

export default ProductTable;
