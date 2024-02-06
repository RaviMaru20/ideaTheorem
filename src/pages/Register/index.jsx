import { Box, Typography, useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.svg";
import logoMobile from "../../assets/logoMobile.svg";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box>
      <Box
        backgroundColor="#252F3D"
        width="100%"
        height={isMobile ? "49px" : "56.83px"}
        display="flex"
        alignItems="center"
      >
        <img
          src={isMobile ? logoMobile : logo}
          style={{
            marginLeft: isMobile ? "17px" : "166px",
          }}
          alt="logo"
        />
      </Box>
      <Box
        width={isMobile ? "100%" : "502px"}
        height="820px"
        m="45px auto"
        border={1}
      >
        <Typography
          px={isMobile ? "2rem" : undefined}
          fontWeight="700"
          sx={{ mb: "1.5rem", fontSize: "20px" }}
        >
          Create User Account
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default Register;
