import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CardContent, Box, Typography, TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExTable from "./Table.js";

const ProductTable = () => {

  return (
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3">Product Table</Typography>
        <Button
          component={RouterLink}
          to="/product-form/"
          variant="contained"
          color="success"
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Add Product
        </Button>
      </Box>
      <Box
        sx={{
          overflow: {
            xs: "auto",
            sm: "unset",
          },
        }}
      >
        <ExTable />
      </Box>
    </CardContent>
  );
};

export default ProductTable;
