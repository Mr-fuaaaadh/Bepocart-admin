
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { CardContent, Box, Typography, Button } from "@mui/material";
import ExTable from "./Table.js";

const BannerTable = () => {
  return (
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3">Banner Table</Typography>

        <Button
          component={RouterLink}
          to="/banner-form/"

          variant="contained"
          color="success"
        >
          Add Banner
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

export default BannerTable;
