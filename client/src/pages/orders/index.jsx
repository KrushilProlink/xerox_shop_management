import React from "react";

import {
  Box,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  FormControl,
  TextField,
} from "@mui/material";

import {
  Description,
  ArrowBack,
  Refresh,
  CheckCircle,
  Print,
  Search,
} from "@mui/icons-material";
import { Header } from "../../components/layout/header";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: 7,

    student: "sakti",

    file: "View 75",

    amount: 15,

    pages: 5,

    copies: 5,

    type: "B/W",

    sides: "Double",

    bin: "Bin A",

    lunchTime: "12:00 PM - 12:30 PM",

    status: "Pending",

    payment: "Cash",

    created: "12/11/2025, 4:54:06 AM",
  },

  {
    id: 6,

    student: "test",

    file: "View 1",

    amount: 1,

    pages: 1,

    copies: 1,

    type: "B/W",

    sides: "Single",

    bin: "Bin A",

    lunchTime: "12:00 PM - 12:30 PM",

    status: "Pending",

    payment: "Cash",

    created: "12/9/2025, 7:40:57 AM",
  },

  {
    id: 5,

    student: "Abishek",

    file: "View 8",

    amount: 1,

    pages: 4,

    copies: 1,

    type: "Color",

    sides: "Single",

    bin: "Bin A",

    lunchTime: "12:30 PM - 1:00 PM",

    status: "Completed",

    payment: "Online",

    created: "12/8/2025, 4:27:19 AM",
  },

  {
    id: 4,

    student: "vetrivel",

    file: "View 18",

    amount: 2,

    pages: 9,

    copies: 1,

    type: "B/W",

    sides: "Single",

    bin: "Bin A",

    lunchTime: "11:30 AM - 12:00 PM",

    status: "Completed",

    payment: "Online",

    created: "11/5/2025, 2:53:47 PM",
  },

  {
    id: 3,

    student: "1",

    file: "View 6",

    amount: 2,

    pages: 3,

    copies: 1,

    type: "B/W",

    sides: "Single",

    bin: "Bin A",

    lunchTime: "12:00 PM - 12:30 PM",

    status: "Pending",

    payment: "Cash",

    created: "11/5/2025, 1:41:45 PM",
  },

  {
    id: 2,

    student: "Sasti",

    file: "View 5",

    amount: 1,

    pages: 5,

    copies: 1,

    type: "B/W",

    sides: "Single",

    bin: "Bin A",

    lunchTime: "12:00 PM - 12:30 PM",

    status: "Completed",

    payment: "Cash",

    created: "11/5/2025, 1:05:43 PM",
  },
];
export default function Orders() {
  const navigate = useNavigate();
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
                <Select defaultValue="all-status" displayEmpty>
                  <MenuItem value="all-status">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select defaultValue="all-payment" displayEmpty>
                  <MenuItem value="all-payment">All Payment</MenuItem>

                  <MenuItem value="cash">Cash</MenuItem>

                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>

              <TextField
                size="small"
                placeholder="Search by student and Id"
                fullWidth
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: "#94a3b8", mr: 1 }} />,
                  sx: {
                    borderRadius: 2,
                    bgcolor: "white",
                    "& fieldset": { borderColor: "#e2e8f0 !important" },
                  },
                }}
                // sx={{ minWidth: { xs: "100%", md: 250 } }}
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
                    ID
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
                    Payment
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
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { bgcolor: "#f8fafc" },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {order.id}
                    </TableCell>

                    <TableCell>{order.student}</TableCell>

                    <TableCell>
                      {/* <Link
                        href="#"
                        style={{
                          color: "#3b82f6",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {order.file}
                      </Link> */}
                    </TableCell>

                    <TableCell>{order.amount}</TableCell>

                    <TableCell>{order.pages}</TableCell>

                    <TableCell>{order.copies}</TableCell>

                    <TableCell>{order.type}</TableCell>

                    <TableCell>{order.sides}</TableCell>

                    <TableCell
                      sx={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.lunchTime}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          bgcolor:
                            order.status === "Completed"
                              ? "#dcfce7"
                              : "#fef3c7",

                          color:
                            order.status === "Completed"
                              ? "#15803d"
                              : "#b45309",

                          fontWeight: 500,

                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={order.payment}
                        size="small"
                        sx={{
                          bgcolor:
                            order.payment === "Online" ? "#d1fae5" : "#ffedd5",

                          color:
                            order.payment === "Online" ? "#047857" : "#c2410c",

                          fontWeight: 500,

                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.created}
                    </TableCell>

                    <TableCell>
                      <Stack spacing={1}>
                        {order.status === "Pending" && (
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
                        >
                          Print
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>

      {/* Footer */}

      <Box sx={{ mt: 6, textAlign: "center", pb: 3 }}>
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
          Introducing Smart-Xerox — A Digital Solution for College Xerox Shop
          Management
        </Typography>
      </Box>
    </Box>
  );
}
