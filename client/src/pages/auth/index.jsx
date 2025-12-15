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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email, password };
   
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", payload);
      if(res.status === 200){
        login(res.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
