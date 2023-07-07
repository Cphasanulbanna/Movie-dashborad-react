import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
        .string()
        .test("has-capital-letter", "Password must contain at least one capital letter", (value) =>
            /[A-Z]/.test(value)
        )
        .min(6, "Password must be at least 6 characters")
        .required("This field is required"),
});

export const signupSchema = yup.object().shape({
    username: yup.string().required("This field is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
        .string()
        .test("has-capital-letter", "Password must contain at least one capital letter", (value) =>
            /[A-Z]/.test(value)
        )
        .min(6, "Password must be at least 6 characters")
        .required("This field is required"),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .test("has-capital-letter", "Password must contain at least one capital letter", (value) =>
            /[A-Z]/.test(value)
        )
        .min(6, "Password must be at least 6 characters")
        .required("This field is required"),
});

export const emailSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
});

export const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .min(4, "OTP lenght should be 4 ")
        .max(4, "OTP length can't exceed 4")
        .required("OTP is required"),
});

export const addMovieSchema = yup.object().shape({
    name: yup.string().required("Movie name is required"),
    poster: yup.string().required("Movie poster is required"),
});
