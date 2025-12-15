// client/src/components/layout/header.jsx

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Logout, Print } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

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

export function Header() {
  const { logout } = useAuth(); // <--- Use the logout function

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white', 
        borderRadius: 2, 
        mb: 4,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <GradientIconBox>
            <Print sx={{ color: 'white' }} />
          </GradientIconBox>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: "linear-gradient(to right, #2563eb, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Xerox Admin
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="error" 
          size="small"
          startIcon={<Logout />}
          onClick={logout} 
          sx={{ 
            boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
            textTransform: 'none'
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}