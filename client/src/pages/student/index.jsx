import { ArrowBack, Refresh, Search } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/header";
const orders = [
  {
    id: 7,
    username: "sakti",
    email: "krushil@gmail.com",
    mobileNo: "9876543210",
    created: "12/11/2025, 4:54:06 AM",
  },
];
export default function Student() {
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
            <FormatListBulletedIcon sx={{ color: "#ef4444" }} />

            <Typography variant="h6" fontWeight={600} color="#1e293b">
              Students
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
                    Email
                  </TableCell>

                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    Mobile No.
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

                    <TableCell>{order.username}</TableCell>

                    <TableCell>{order.email}</TableCell>

                    <TableCell>{order.mobileNo}</TableCell>

                    <TableCell
                      sx={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.created}
                    </TableCell>

                    <TableCell></TableCell>
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
