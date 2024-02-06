/* eslint-disable no-unused-vars */
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  MenuItem,
  InputLabel,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSchema, initialValues, months, years } from "./FormSchema";

const RegisterForm = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission.
   *
   * @param {Object} values - The form values.
   * @param {Object} onSubmitProps - The form submission props.
   * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    const { day, month, year, full_name, ...rest } = values;
    const trimmedfull_name = full_name.trim();
    const dateOfBirth = `${month} ${day}, ${year}`;
    const updatedValues = {
      full_name: trimmedfull_name,
      date_of_birth: dateOfBirth,
      ...rest,
    };
    try {
      // Send POST request with form values
      const response = await axios.post(
        "https://fullstack-test-navy.vercel.app/api/users/create",
        updatedValues
      );
      const data = response.data;
      const message = data.description;
      console.log(data);

      if (data.title === "Success") {
        toast.success(message, {
          position: isMobile ? "bottom-right" : "top-right",
        });
        setLoading(false);
        onSubmitProps.resetForm();
      }
      if (data.title === "Registration Error") {
        toast.error(message);
        setLoading(false);
      }
    } catch (error) {
      onSubmitProps.resetForm();
      console.error("Error:", error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={FormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* Input TextFileds from MUI */}
          <Box
            width={isMobile ? "100%" : "502px"}
            minHeight="684px"
            borderRadius="8px"
            p="2rem"
            display="grid"
            mb="2rem"
            gap="20px"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isMobile ? "span 3" : undefined },
              boxShadow: isMobile ? "none" : "0px 4px 30px 0px #00000014",
            }}
          >
            <>
              <Box minHeight="83px" sx={{ gridColumn: "span 3" }}>
                <label htmlFor="full_name">
                  <Typography fontWeight="600" fontSize="16px" pb="10px">
                    Full Name
                  </Typography>
                </label>
                <TextField
                  label={
                    <Typography>
                      Full Name<span style={{ color: "red" }}>*</span>
                    </Typography>
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  name="full_name"
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  fullWidth
                />
              </Box>
              <Box minHeight="83px" sx={{ gridColumn: "span 3" }}>
                <label htmlFor="contact_number">
                  <Typography fontWeight="600" fontSize="16px" pb="10px">
                    Contact Number
                  </Typography>
                </label>
                <TextField
                  label={
                    <Typography>
                      Contact Number<span style={{ color: "red" }}>*</span>
                    </Typography>
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_number}
                  name="contact_number"
                  error={
                    touched.contact_number && Boolean(errors.contact_number)
                  }
                  helperText={touched.contact_number && errors.contact_number}
                  fullWidth
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 3" }}
                height="83px"
              >
                <label htmlFor="">
                  <Typography fontWeight="600" fontSize="16px">
                    Birthdate
                  </Typography>
                </label>
                <FlexBetween sx={{ gridColumn: "span 3", gap: "10px" }}>
                  <TextField
                    label={
                      <Typography>
                        Day<span style={{ color: "red" }}>*</span>
                      </Typography>
                    }
                    select
                    variant="outlined"
                    margin="normal"
                    value={values.day}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="day"
                    error={touched.day && Boolean(errors.day)}
                    // helperText={touched.day && errors.day}
                    sx={{ flex: "1" }}
                  >
                    {[...Array(31)].map((_, index) => (
                      <MenuItem key={index + 1} value={String(index + 1)}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={
                      <Typography>
                        Month<span style={{ color: "red" }}>*</span>
                      </Typography>
                    }
                    select
                    variant="outlined"
                    margin="normal"
                    value={values.month}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="month"
                    error={touched.month && Boolean(errors.month)}
                    // helperText={touched.month && errors.month}
                    sx={{ flex: "1" }}
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={
                      <Typography>
                        Year<span style={{ color: "red" }}>*</span>
                      </Typography>
                    }
                    select
                    variant="outlined"
                    margin="normal"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="year"
                    error={touched.year && Boolean(errors.year)}
                    // helperText={touched.year && errors.year}
                    sx={{ flex: "1" }}
                  >
                    {years.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FlexBetween>
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <label htmlFor="email">
                  <Typography fontWeight="600" fontSize="16px" pb="10px">
                    Email Address
                  </Typography>
                </label>
                <TextField
                  label={
                    <Typography>
                      Email<span style={{ color: "red" }}>*</span>
                    </Typography>
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 3" }}
                  fullWidth
                />
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <label htmlFor="password">
                  <Typography fontWeight="600" fontSize="16px" pb="10px">
                    Password
                  </Typography>
                </label>
                <TextField
                  label={
                    <Typography>
                      Password<span style={{ color: "red" }}>*</span>
                    </Typography>
                  }
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 3" }}
                  fullWidth
                />
              </Box>
              <Box sx={{ gridColumn: "span 3" }}>
                <label htmlFor="confirm_password">
                  <Typography fontWeight="600" fontSize="16px" pb="10px">
                    Confirm Password
                  </Typography>
                </label>
                <TextField
                  label={
                    <Typography>
                      Confirm Password<span style={{ color: "red" }}>*</span>
                    </Typography>
                  }
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  name="confirm_password"
                  error={
                    touched.confirm_password && Boolean(errors.confirm_password)
                  }
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                  sx={{ gridColumn: "span 3" }}
                  fullWidth
                />
              </Box>
            </>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="144px"
            sx={{
              boxShadow: isMobile ? "0px 4px 30px 0px #00000014" : "none",
            }}
          >
            {/* MUI Buttons */}
            <Box
              display="flex"
              px={isMobile ? "2rem" : undefined}
              py={isMobile ? "1rem" : undefined}
              flexDirection={isMobile ? "column" : undefined}
              gap={isMobile ? "20px" : undefined}
              width={isMobile ? "100%" : "305px"}
              height={isMobile ? "100%" : "46px"}
              justifyContent="space-between"
            >
              <Button
                variant="outlined"
                sx={{
                  width: isMobile ? undefined : "145px",
                  height: isMobile ? "46px" : undefined,
                  border: "1px solid #4790A1",
                  color: "#127C95",
                  fontWeight: "600",
                  borderRadius: "6px",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                sx={{
                  width: isMobile ? undefined : "145px",
                  height: isMobile ? "46px" : undefined,
                  backgroundColor: "#127C95",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "6px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(18, 124, 149, 0.8)",
                  },
                }}
              >
                Submit
              </LoadingButton>
            </Box>
            <ToastContainer />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
