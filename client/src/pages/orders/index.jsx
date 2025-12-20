/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";

import {
  ArrowBack,
  CheckCircle,
  DeleteForever,
  Description,
  Print,
  Refresh,
  Search,
} from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Footer from "../../components/layout/footer";
import { Header } from "../../components/layout/header";
import { generateAlert } from "../../utils/alertService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFetchOrders = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      let params = {
        page: currentPage,
        limit: limit,
        status: statusFilter === "all" ? "" : statusFilter,
      };

      if (searchItem.trim() !== "") {
        params.search = searchItem.trim();
      }
      const res = await axiosInstance.get("/api/order", { params });

      if (res.status === 200) {
        setOrders(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      generateAlert("Error fetching orders", "error");
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setStatusFilter("all");
    setLimit(5);
    setPage(1);
    setSearchItem("");
    handleFetchOrders(1);
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    if (
      window.confirm("Are you sure you want to change this order’s status?")
    ) {
      try {
        const res = await axiosInstance.patch("/api/order/change-status", {
          orderId,
          status: newStatus,
        });

        if (res.status === 200) {
          generateAlert(res?.data?.message, "success");
          handleFetchOrders(page);
        }
      } catch (error) {
        generateAlert("Error changing order status", "error");
        console.error("Error changing order status:", error);
      }
    }
  };

  const handlePrint = (fileUrl) => {
    const printWindow = window.open(fileUrl, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await axiosInstance.delete(`/api/order/delete/${orderId}`);
        if (res.status === 200) {
          generateAlert(res?.data?.message, "success");
          4;
          handleFetchOrders(page);
        }
      } catch (error) {
        generateAlert("Error deleting order", "error");
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    handleFetchOrders(page);
  }, [page, limit, statusFilter, searchItem]);
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
        <Card
          elevation={0}
          sx={{ border: "1px solid #e2e8f0", borderRadius: 2, p: 3 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Description sx={{ color: "#ef4444" }} />
            <Typography variant="h6" fontWeight={600} color="#1e293b">
              Orders
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "#f8fafc",
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select
                  defaultValue="all-status"
                  displayEmpty
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size="small"
                placeholder="Search by student"
                fullWidth
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: "#94a3b8", mr: 1 }} />,
                  sx: {
                    borderRadius: 2,
                    bgcolor: "white",
                    "& fieldset": { borderColor: "#e2e8f0 !important" },
                  },
                }}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Button
                variant="contained"
                color="inherit"
                startIcon={<ArrowBack />}
                sx={{
                  bgcolor: "#e2e8f0",
                  color: "#334155",
                  "&:hover": { bgcolor: "#cbd5e1" },
                  textTransform: "none",
                }}
                onClick={() => navigate(-1)}
              >
                Back to Dashboard
              </Button>

              <Button
                variant="contained"
                startIcon={<Refresh />}
                sx={{
                  bgcolor: "#3b82f6",
                  "&:hover": { bgcolor: "#2563eb" },
                  textTransform: "none",
                }}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Stack>
          </Paper>

          {/* Table */}

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: "1px solid #e2e8f0", borderRadius: 1 }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#0f172a" }}>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    No.
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Student
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    File
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Amount (₹)
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Pages
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Copies
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Print Type
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Sides
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Lunch Time
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Status
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Created
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      <CircularProgress size={30} />
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders?.map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1 + (page - 1) * limit}</TableCell>
                      <TableCell>{order.studentName}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => window.open(order.file.url, "_blank")}
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {order.amount}
                      </TableCell>
                      <TableCell>{order.pages}</TableCell>
                      <TableCell>{order.copies}</TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {order.printType}
                      </TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {order.sides}
                      </TableCell>
                      <TableCell>{order.lunchTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{ textTransform: "capitalize" }}
                          color={
                            order.status === "completed" ? "success" : "warning"
                          }
                        />
                      </TableCell>
                      {/* <TableCell>—</TableCell> */}
                      <TableCell>
                        {moment(order.createdAt).format(
                          "DD/MM/YYYY, h:mm:ss A"
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack spacing={1}>
                          {order.status === "pending" && (
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<CheckCircle sx={{ fontSize: 14 }} />}
                              sx={{
                                bgcolor: "#059669",
                                "&:hover": { bgcolor: "#047857" },
                                fontSize: "0.65rem",
                                py: 0.5,
                                minWidth: "auto",
                                textTransform: "none",
                              }}
                              onClick={() =>
                                handleChangeOrderStatus(order?._id, "completed")
                              }
                            >
                              Mark Complete
                            </Button>
                          )}

                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Print sx={{ fontSize: 14 }} />}
                            sx={{
                              bgcolor: "#06b6d4",
                              "&:hover": { bgcolor: "#0891b2" },
                              fontSize: "0.65rem",
                              py: 0.5,
                              minWidth: "auto",
                              textTransform: "none",
                            }}
                            onClick={() => handlePrint(order?.file?.url)}
                          >
                            Print
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteForever sx={{ fontSize: 14 }} />}
                            color="error"
                            sx={{
                              fontSize: "0.65rem",
                              py: 0.5,
                              minWidth: "auto",
                              textTransform: "none",
                            }}
                            onClick={() => handleDelete(order?._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isLoading && orders?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={limit}
                  onChange={(e) => {
                    setLimit(e.target.value);
                    setPage(1);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}
