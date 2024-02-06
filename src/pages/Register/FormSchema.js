import * as yup from "yup";

export const FormSchema = yup.object().shape(
  {
    full_name: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z]+$/, "Full name must contain only letters")
      .required("Full name is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .matches(
        /^(?:\+?1[-.●]?)?(?:\(\d{3}\)|\d{3})[-.●]?\d{3}[-.●]?\d{4}$/,
        "Invalid Canadian phone number"
      ),
    day: yup.string().required("Day is required"),
    month: yup.string().required("Month is required"),
    year: yup
      .number()
      .required("Year is required")
      .min(new Date().getFullYear() - 100, "Year should be in the past")
      .max(new Date().getFullYear(), "Year should be in the future"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,

        "min length 8, 1 uppercase, 1 lowercase, 1 number"
      ),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  },
  { strict: false }
);

export const initialValues = {
  full_name: "",
  contact_number: "",
  day: "",
  month: "",
  year: "",
  email: "",
  password: "",
  confirm_password: "",
};
export const months = [
  { value: "Jan", label: "January" },
  { value: "Feb", label: "February" },
  { value: "Mar", label: "March" },
  { value: "Apr", label: "April" },
  { value: "May", label: "May" },
  { value: "Jun", label: "June" },
  { value: "Jul", label: "July" },
  { value: "Aug", label: "August" },
  { value: "Sep", label: "September" },
  { value: "Oct", label: "October" },
  { value: "Nov", label: "November" },
  { value: "Dec", label: "December" },
];
export const years = Array.from({ length: 100 }, (_, i) => ({
  value: String(new Date().getFullYear() - i),
  label: String(new Date().getFullYear() - i),
}));
