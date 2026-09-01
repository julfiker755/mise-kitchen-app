import * as Yup from "yup";

export const email_sc = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
export const Login_sc = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const register_sc = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const otp_sc = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d+$/, "OTP must be numeric")
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP must be at most 6 digits")
    .required("OTP is required"),
});

export const change_sc = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});


export const changepassword_sc = Yup.object().shape({
  current_password: Yup.string()
    .min(6, "Current password must be at least 6 characters")
    .required("Current password is required"),
  password: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const recipe_step_sc = Yup.object().shape({
  id: Yup.string().optional(),
  title: Yup.string().required("Instruction title is required"),
  description: Yup.string().required("Instruction details are required"),
  image: Yup.string().optional(),
});

export const recipe_sc = Yup.object().shape({
  name: Yup.string().required("Recipe name is required"),
  description: Yup.string().required("Recipe description is required"),
  category: Yup.string().required("Please select a category"),
  cookingTime: Yup.string().required("Cooking time is required"),
  servings: Yup.string().required("Please select servings"),
  cuisine: Yup.string().required("Please select cuisine"),
  mainImage: Yup.string().optional(),
  galleryImages: Yup.array().of(Yup.string()).optional(),
  ingredients: Yup.array()
    .of(Yup.string())
    .min(1, "Please add at least one ingredient"),
  instructions: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().optional(),
        title: Yup.string().required("Step title is required"),
        description: Yup.string().required("Step description is required"),
        image: Yup.string().optional(),
      })
    )
    .min(1, "Please add at least one instruction step"),
});