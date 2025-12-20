import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Print, Login as LoginIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const GradientIconBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  background: "linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2)",
  marginRight: theme.spacing(1.5),
}));

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    setLoading(true);
    const payload = { email: values?.email, password: values?.password };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        payload
      );
      if (res.status === 200) {
        login(res.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleLogin(values);
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Card
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header/Logo */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={3}
          >
            <GradientIconBox sx={{ marginRight: 1 }}>
              <Print sx={{ color: "white", fontSize: 24 }} />
            </GradientIconBox>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(to right, #2563eb, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Xerox Admin
            </Typography>
          </Box>

          <Typography
            variant="h6"
            align="center"
            mb={3}
            fontWeight={600}
            color="#1e293b"
          >
            Sign In
          </Typography>

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={loading ? null : <LoginIcon />}
              disabled={loading}
              sx={{
                mt: 1,
                bgcolor: "#3b82f6",
                "&:hover": { bgcolor: "#2563eb" },
                textTransform: "none",
                py: 1.2,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
