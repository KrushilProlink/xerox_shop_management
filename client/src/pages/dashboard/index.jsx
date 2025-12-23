import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";

import { Search } from "@mui/icons-material";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Header } from "../../components/layout/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useEffect } from "react";
import moment from "moment";
import Footer from "../../components/layout/footer";
import { generateAlert } from "../../utils/alertService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");

  const navigate = useNavigate();

  const handleFetchDashboard = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/api/dashboard", {
        params: { filterType },
      });
      if (res.status === 200) {
        setDashboard(res.data);
      }
    } catch (error) {
      generateAlert("Error fetching dashboard data", "error");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchDashboard();
  }, [filterType]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        p: { xs: 2, md: 3 },
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Header />
      <Box>
        {/* Top Stats Row */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard
              title="Total Students"
              value={dashboard?.data?.totalStudents || 0}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard
              title="Total Orders"
              value={dashboard?.data?.totalOrders || 0}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard
              title="Pending"
              value={dashboard?.data?.pendingOrders || 0}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard
              title="Completed"
              value={dashboard?.data?.completedOrders || 0}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard title="Cash" value={dashboard?.data?.cashCount || 0} />
          </Grid>

          <Grid size={{ xs: 6, md: 4, lg: 2 }}>
            <StatCard
              title="Total Earned (₹)"
              value={dashboard?.data?.totalEarned || 0}
            />
          </Grid>
        </Grid>

        {/* Filter & Actions Row */}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 200, flex: { md: 1 } }}>
            <Select
              defaultValue="all"
              displayEmpty
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="yesterday">Yesterday</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: { md: 1.5 }, width: "100%" }}>
            {/* <Link href="/orders"> */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<Search />}
              onClick={() => navigate("/orders")}
              sx={{
                bgcolor: "#0f172a",
                "&:hover": { bgcolor: "#1e293b" },
                textTransform: "none",
                py: 1,
              }}
            >
              View Orders
            </Button>
            {/* </Link> */}
          </Box>

          <Box sx={{ flex: { md: 1.5 }, width: "100%" }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<Search />}
              onClick={() => navigate("/students")}
              sx={{ textTransform: "none", py: 1 }}
            >
              View Students
            </Button>
          </Box>
        </Paper>

        {/* Second Stats Row */}

        <Grid container spacing={2} sx={{ mb: 3 }} textTransform={"capitalize"}>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              label={`Filter: ${filterType}`}
              value={
                dashboard?.filters?.fromDate
                  ? dashboard?.filters?.filterType === "today" ||
                    dashboard?.filters?.filterType === "yesterday"
                    ? moment(dashboard?.filters?.fromDate).format("DD/MM/YYYY")
                    : `${
                        moment(dashboard?.filters?.fromDate).format(
                          "DD/MM/YYYY"
                        ) +
                        " To " +
                        moment(dashboard?.filters?.toDate).format("DD/MM/YYYY")
                      }`
                  : "--"
              }
              style={{ textTransform: "capitalize", fontSize: "16px" }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard label="Cash Count" value="0" subtext="₹0" />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard label="Online Count" value="0" subtext="₹0" />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              label="Updated"
              subtext={
                dashboard?.lastUpdated
                  ? moment(dashboard?.lastUpdated).format("DD/MM/YYYY hh:mm A")
                  : "--"
              }
              value=""
            />
          </Grid>
        </Grid>

        {/* Chart Section */}

        <Card
          elevation={0}
          sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "#334155",
                fontWeight: 500,
                fontSize: "1.125rem",
              }}
            >
              Last 7 Days - Payments (Count)
            </Typography>

            <Box sx={{ height: 300, width: "100%" }}>
              {isLoading ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={30} />
                  </Box>
                </>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard?.chartData}>
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />

                    <Tooltip
                      cursor={{ fill: "#f1f5f9" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}

function StatCard({ title, value }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #e2e8f0",

        borderRadius: 3,

        height: "100%",

        transition: "all 0.2s",

        "&:hover": {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",

          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",

            fontWeight: 600,

            textTransform: "uppercase",

            letterSpacing: "0.05em",

            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function InfoCard({ label, value, subtext, style }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #e2e8f0",
        borderRadius: 3,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent
        sx={{ textAlign: "center", p: 3, "&:last-child": { pb: 3 } }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#64748b", fontWeight: 500, mb: 0.5 }}
        >
          {label}
        </Typography>

        {value && (
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#0f172a" }}
            style={style}
          >
            {value}
          </Typography>
        )}

        {subtext && (
          <Typography
            variant="caption"
            sx={{ color: "#94a3b8", mt: 0.5, display: "block" }}
          >
            {subtext}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
