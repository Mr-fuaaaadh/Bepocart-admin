import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ExTable from "./Table.js";

const ProductTable = () => {
  return (
    <Box position="relative">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Product Table</Typography>
          <Box
            sx={{
              overflowX: "auto",  // Allow horizontal scrolling
              overflowY: "hidden", // Prevent vertical scrolling
              whiteSpace: "nowrap", // Prevent wrapping of table content
              maxWidth: "100%", // Ensure it fits within the container
            }}
          >
            <ExTable />
          </Box>
        </CardContent>
      </Card>
      <Button
        component={RouterLink}
        to="/product-form/"
        variant="contained"
        color="success"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          mt: 2,
          ml: 125, // Adjusted for a more realistic margin
        }}
      >
        Add Banner
      </Button>
    </Box>
  );
};

export default ProductTable;
