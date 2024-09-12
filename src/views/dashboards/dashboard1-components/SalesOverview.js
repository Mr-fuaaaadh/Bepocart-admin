import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import axios from "axios"; // Import Axios
import { 
  ShoppingCart as ShoppingCartIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircle as CheckCircleIcon,
  Today as TodayIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

// Styled component for the logo
const Logo = styled('img')({
  maxWidth: '150px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
});

const token = localStorage.getItem('token')
const MetricBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));

const MetricIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '2rem',
}));

const SalesOverview = () => {
  // State to hold order data
  const [orderData, setOrderData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todaysOrders: 0,
    monthlyOrders: 0,
    salesOverview: [],
  });

  // Function to fetch orders from the API
  const fetchOrderData = async () => {
    try {
      const response = await axios.get("https://bepocart.in/admin/Bepocart-Orders/",{
        headers: {
          'Authorization': `${token}`,
      },
      }); // Update with your actual API endpoint
      const orders = response.data.data;

      // Calculate the different order statistics from the response data
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const completedOrders = orders.filter(order => order.status === 'Completed').length;
      const todaysOrders = orders.filter(order => new Date(order.created_at).toDateString() === new Date().toDateString()).length;
      const monthlyOrders = orders.filter(order => new Date(order.created_at).getMonth() === new Date().getMonth()).length;

      // Mock sales data for the chart
      const salesOverview = [
        {
          name: "Ample Admin",
          data: [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390, 180],
        },
        {
          name: "Pixel Admin",
          data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250, 310],
        },
      ];

      // Update state with the fetched data
      setOrderData({
        totalOrders,
        pendingOrders,
        completedOrders,
        todaysOrders,
        monthlyOrders,
        salesOverview,
      });
    } catch (error) {
      console.error("Error fetching order data", error);
    }
  };

  // Fetch order data when the component is mounted
  useEffect(() => {
    fetchOrderData();
  }, []);

  // Chart options and data
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    colors: ["#1e4db7", "#a7e3f4"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  const seriessalesoverview = orderData.salesOverview;

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: "0",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "16px !important",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginTop: "10px",
              marginBottom: "0",
            }}
            gutterBottom
          >
            Sales Overview
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 2,
            marginBottom: '25px',
          }}
        >
          <MetricBox sx={{ backgroundColor: '#e3f2fd' }}>
            <MetricIcon>
              <ShoppingCartIcon sx={{ color: '#1e4db7' }} />
            </MetricIcon>
            <Typography variant="h5" sx={{ color: '#1e4db7' }}>Total Orders</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderData.totalOrders}</Typography>
          </MetricBox>
          <MetricBox sx={{ backgroundColor: '#fce4ec' }}>
            <MetricIcon>
              <HourglassEmptyIcon sx={{ color: '#ff5722' }} />
            </MetricIcon>
            <Typography variant="h5" sx={{ color: '#ff5722' }}>Pending Orders</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderData.pendingOrders}</Typography>
          </MetricBox>
          <MetricBox sx={{ backgroundColor: '#e8f5e9' }}>
            <MetricIcon>
              <CheckCircleIcon sx={{ color: '#4caf50' }} />
            </MetricIcon>
            <Typography variant="h5" sx={{ color: '#4caf50' }}>Completed Orders</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderData.completedOrders}</Typography>
          </MetricBox>
          <MetricBox sx={{ backgroundColor: '#e1bee7' }}>
            <MetricIcon>
              <TodayIcon sx={{ color: '#ab47bc' }} />
            </MetricIcon>
            <Typography variant="h5" sx={{ color: '#ab47bc' }}>Today's Orders</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderData.todaysOrders}</Typography>
          </MetricBox>
          <MetricBox sx={{ backgroundColor: '#d0f0c0' }}>
            <MetricIcon>
              <CalendarTodayIcon sx={{ color: '#66bb6a' }} />
            </MetricIcon>
            <Typography variant="h5" sx={{ color: '#66bb6a' }}>Monthly Orders</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderData.monthlyOrders}</Typography>
          </MetricBox>
        </Box>
        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
