import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ExTable from "./Table.js";

const CategoryTable = () => {
  return (
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3">Sub Category Table</Typography>
          <Button
            component={RouterLink}
            to="/subcategory-form/"
            variant="contained"
            color="success"
          >
            Add Subcategory
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

export default CategoryTable;
