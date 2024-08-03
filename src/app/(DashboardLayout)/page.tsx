"use client";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchCoinRequest } from "@/redux/slices";
import { DataGrid } from "@mui/x-data-grid";
import DashboardCard from "./components/shared/DashboardCard";
import moment from "moment";

// components
export const coins = ["bitcoin", "ethereum", "cardano", "solana", "dogecoin"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [activeItem, setActiveItem] = React.useState(coins[0]);

  useEffect(() => {
    dispatch(
      fetchCoinRequest({
        body: { activeItem: activeItem },
        callback: (response: any) => {
          if (response && response.data) {
            const data = response.data.map((coin: any, index: number) => {
              const formattedDate = moment(coin.lastUpdated).format(
                "DD MMM YYYY, hh:mm A"
              );

              return {
                id: index + 1,
                name: coin.coinName,
                currentPrice: coin.currentPrice,
                lastUpdated: formattedDate,
              };
            });
            setRows(data);
          }
        },
      })
    );
  }, [dispatch, activeItem]);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveItem(event.target.value as string);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">Coin Table</Typography>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">Select Coin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Coin"
              value={activeItem}
              onChange={handleChange}
            >
              <MenuItem value={"bitcoin"}>bitcoin</MenuItem>
              <MenuItem value={"ethereum"}>ethereum</MenuItem>
              <MenuItem value={"cardano"}>cardano</MenuItem>
              <MenuItem value={"solana"}>solana</MenuItem>
              <MenuItem value={"dogecoin"}>dogecoin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DashboardCard>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                columns={[
                  { field: "name", headerName: "Coin Name", width: 150 },
                  {
                    field: "currentPrice",
                    headerName: "Current Price",
                    width: 150,
                  },
                  {
                    field: "lastUpdated",
                    headerName: "Last Updated",
                    width: 200,
                  },
                ]}
                rows={rows}
                hideFooterPagination
              />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
