import axios from 'axios';
import React, { useState } from "react";
import { Card, CardContent, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TableBanner from "./Table";

const ProductTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(""); // Add state for status
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Since type="date" inputs already provide YYYY-MM-DD format, no need to format it
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value); // Directly set the value
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value); // Directly set the value
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    const requestBody = {
      searchQuery,
      startDate,
      endDate,
      status, 
    };

    // Log the request body for debugging
    console.log('Request Body:', requestBody);

    // Send data to the backend API and handle the Excel file download
    axios.post('http://127.0.0.1:8000/admin/export-orders/', requestBody, {
      responseType: 'blob' // This ensures the response is treated as binary data
    })
    .then(response => {
      // Create a Blob from the response
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Create a link element
      const link = document.createElement('a');
      // Set the download URL
      link.href = window.URL.createObjectURL(blob);
      link.download = `orders_${startDate}_to_${endDate}.xlsx`;
      // Append the link to the body
      document.body.appendChild(link);
      // Trigger the download
      link.click();
      // Remove the link from the body
      document.body.removeChild(link);

      // Show success message
      alert('Excel file downloaded successfully.');
    })
    .catch(error => {
      console.error('Error sending data:', error);
      alert('Failed to generate Excel file. Please try again.');
    });

    setSubmittedQuery(searchQuery);
  };

  return (
    <Box position="relative">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Orders Table</Typography>
          <Box my={5} display="flex" alignItems="center" gap={2}>
            <TextField
              label="Search"
              placeholder="Search by username / date"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={handleStartDateChange}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={handleEndDateChange}
            />
            <FormControl variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="packing">Packing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="refunded">Refunded</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<SearchIcon />}
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
            <TableBanner searchQuery={submittedQuery} startDate={startDate} endDate={endDate} status={status} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductTable;
