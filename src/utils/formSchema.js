import * as yup from "yup";
import { validName, validPassword } from "./regex";

export const signupSchema = yup.object().shape({
    firstName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("First name is required"),

    lastName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("Last name is required"),

    email: yup.string().email("Please enter a valid email").required("Email is required"),

    phone: yup.string().min(6).required("Phone number is required"),

    password: yup
        .string()
        .min(6)
        .transform((value) => (value ? value.trim() : ""))
        .matches(validPassword, {
            message:
                "Minimum of 6 characters. Must contain 1 uppercase letter, 1 lowercase letter and 1 number",
        })
        .required("Password is required"),
});

export const signinSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),

    password: yup.string().required("Password is required"),
});

export const changePasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(6)
        .transform((value) => (value ? value.trim() : ""))
        .matches(validPassword, {
            message:
                "Minimum of 6 characters. Must contain 1 uppercase letter, 1 lowercase letter and 1 number",
        })
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export const changePhoneNumberSchema = yup.object().shape({
    phone: yup.string().required("Phone Number is required"),
});

export const addServiceSchema = yup.object().shape({
    name: yup.string().required("Service Name is required"),
    category: yup.string().required("Service Category is required"),
});

export const addHealthWorkerSchema = yup.object().shape({
    firstName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("Firstname is required"),

    lastName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("Lastname is required"),

    email: yup.string().email("Please enter a valid email").required("Email is required"),

    phone: yup.string().min(6).required("Phone number is required"),
    qualification: yup.string().required("Qualification is required"),
});

export const addUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("First name is required"),

    lastName: yup
        .string()
        .transform((value) => (value ? value.trim() : ""))
        .matches(validName, {
            message: "Minimum of 3 characters and must not contain special characters",
        })
        .required("Last name is required"),

    email: yup.string().email("Please enter a valid email").required("Email is required"),

    phone: yup.string().min(6).required("Phone number is required"),

    password: yup
        .string()
        .min(6)
        .transform((value) => (value ? value.trim() : ""))
        .matches(validPassword, {
            message:
                "Minimum of 6 characters. Must contain 1 uppercase letter, 1 lowercase letter and 1 number",
        })
        .required("Password is required"),

    role: yup.string().required("Role is required"),

    dob: yup.string().required("Date of Birth is required"),
});

export const sendBulkEmailSchema = yup.object().shape({
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
    // emails: yup.string()
    //   .required('Required')
    //   .test('emails', 'Must be valid emails', value => {
    //     const emails = value.split(',').map(email => email.trim());
    //     return emails.every(email => yup.string().email().isValidSync(email));
    //   }),
});

export const bookAppointmentSchema = yup.object().shape({
    date: yup
        .date()
        .min(new Date(new Date().setDate(new Date().getDate() - 1)), "Date cannot be in the past")
        .required("Date is required"),
    time: yup.string().required("Time is required"),
    notes: yup.string().optional().default(""),
});
