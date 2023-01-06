import * as yup from "yup";
import {validName, validPassword} from "./regex";

export const signupSchema = yup.object().shape({
	firstName: yup.string().matches(validName, {message: "Minimum of 3 characters and must not contain special characters"}).required("First name is required"),
	lastName: yup.string().matches(validName, {message: "Minimum of 3 characters and must not contain special characters"}).required("Last name is required"),
	email: yup.string().email("Please enter a valid email").required("Email is required"),
	phone: yup.string().min(6).required("Phone number is required"),
	password: yup.string().min(6).matches(validPassword, { message: "Minimum of 6 characters. Must contain 1 uppercase letter, 1 lowercase letter and 1 number" }).required("Password is required"),
});

export const signinSchema = yup.object().shape({
	email: yup.string().email("Please enter a valid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});