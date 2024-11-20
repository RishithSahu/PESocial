import React, { useState } from "react";
import { Button, TextField, Box, Typography, Input, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for the API request

const EditProfile = ({ userId, token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [picturePath, setPicturePath] = useState(null); // Ensure it's null by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    if (!firstName || !lastName || !location || !occupation) {
      setError("All fields except Profile Picture are required.");
      return;
    }

    if (!userId || !token) {
      setError("User session has expired. Please log in again.");
      navigate("/");
      return;
    }

    const form = new FormData();
    form.append("userId", userId);
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("location", location);
    form.append("occupation", occupation);

    if (picturePath) {
      form.append("picture", picturePath); // Append the file for upload
    }

    try {
      console.log("Form Data:", Object.fromEntries(form)); // Log form data
    console.log("Request Details:", {
      url: `/users/${userId}`, 
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    });
      setLoading(true);
      setError(null);

      // Axios request to update the user profile
      const response = await axios.put(`http://localhost:3001/users/${userId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Redirect back to the profile page after a successful update
        navigate(`/home`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Full Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      setError("Failed to update profile. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f9"
      padding="1rem"
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Typography variant="h4" marginBottom="2rem" align="center" sx={{ color: "#333" }}>
          Edit Profile
        </Typography>

        {error && (
          <Typography
            variant="body2"
            align="center"
            color="error"
            sx={{ marginBottom: "1rem" }}
          >
            {error}
          </Typography>
        )}

        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Box width="100%" margin="normal">
          <Input
            type="file"
            onChange={(e) => setPicturePath(e.target.files?.[0] || null)} // Safely handle file change
            fullWidth
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ marginTop: "1rem" }}
          fullWidth
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Container>
    </Box>
  );
};

export default EditProfile;