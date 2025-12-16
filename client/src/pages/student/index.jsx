/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowBack, Refresh, Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  IconButton,
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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/header";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useEffect } from "react";
import moment from "moment";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetchStudent = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      let params = {
        page: currentPage,
        limit: limit,
      };

      if (searchItem !== "") {
        params.search = searchItem;
      }
      const res = await axiosInstance.get("/api/student", { params });

      if (res.status === 200) {
        setStudents(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await axiosInstance.delete(`/api/student/${id}`);
        if (res.status === 200) {
          // alert("Student deleted successfully");
          handleFetchStudent(page);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleRefresh = () => {
    setLimit(5);
    setPage(1);
    setSearchItem("");
    handleFetchStudent(1);
  };

  useEffect(() => {
    handleFetchStudent(page);
  }, [page, limit, searchItem]);

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
                placeholder="Search"
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      <CircularProgress size={30} />
                    </TableCell>
                  </TableRow>
                ) : students?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  students?.map((student, index) => (
                    <TableRow
                      key={student._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { bgcolor: "#f8fafc" },
                      }}
                    >
                      <TableCell>{index + 1 + (page - 1) * limit}</TableCell>

                      <TableCell>{student.username}</TableCell>

                      <TableCell>{student.email}</TableCell>

                      <TableCell>{student.mobileNo}</TableCell>

                      <TableCell
                        sx={{
                          fontSize: "0.75rem",
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {moment(student.createdAt).format(
                          "DD/MM/YYYY, h:mm:ss A"
                        )}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteStudent(student._id)}
                          sx={{
                            color: "#ef4444",
                            "&:hover": { bgcolor: "#fee2e2" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isLoading && students?.length > 0 && (
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
