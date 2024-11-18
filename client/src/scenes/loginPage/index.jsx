import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useState } from "react";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Added state for error message
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          PESocial
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to PESocial, the Social Media for Pests!
        </Typography>

        {/* Passed setErrorMessage and errorMessage as props to the Form component */}
        <Form setErrorMessage={setErrorMessage} errorMessage={errorMessage} />

        {/* Displaying the error message if it exists */}
        {errorMessage && (
          <Typography
            color="error"
            sx={{ mt: "1rem", textAlign: "center", fontWeight: "bold" }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;