import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ExTable from "./Table.js";

const ProductTable = () => {
  return (
    <Box position="relative">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Orders Table</Typography>
          <Box
            sx={{
              overflowX: "auto",  
              overflowY: "auto",  
              whiteSpace: "nowrap", 
              maxWidth: "100%", 
              maxHeight: "800px", 
            }}
          >
            <ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductTable;
