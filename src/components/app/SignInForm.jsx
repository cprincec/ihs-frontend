import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { signinSchema } from "../../utils/formSchema";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, storeAuthInfo, togglePersist } from "../../redux/features/authSlice";
import { getKey, setKey } from "../../utils/mobilePreferences";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { NativeBiometric, BiometryType } from "capacitor-native-biometric";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { persist, accessToken } = useSelector((state) => state.auth.userAccess);

    const [errMsg, setErrMsg] = useState("");
    const [revealPwd, setRevealPwd] = useState(false);
    const [mobileAuth, setMobileAuth] = useState("");

    const platform = Capacitor.getPlatform();

    const getPreferencesCredentials = async () => {
        const preferencesEmail = await Preferences.get({ key: "email" });
        const preferencesPassword = await Preferences.get({ key: "password" });

        return { preferencesEmail, preferencesPassword };
    };

    const signinWithBiometric = async (email, password) => {
        const result = await NativeBiometric.isAvailable();

        if (platform === "ios") {
            const isFaceId = result.biometryType == BiometryType.FACE_ID;
        } else if (platform === "android") {
            const isFingerprint = result.biometryType == BiometryType.FINGERPRINT;
        }

        await NativeBiometric.verifyIdentity({
            maxAttempts: 3,
            reason: "For easy log in",
            title: "Log in with ease",
        }).then(async () => {
            await dispatch(signInUser({ email, password }))
                .unwrap()
                .then(async (result) => {
                    if (typeof result === "string") {
                        setErrMsg("Biometric sign-in failed. Please try again or use email/password.");
                    } else {
                        localStorage.setItem("userType", result.data.userType);
                        localStorage.setItem("loggedInFlag", JSON.stringify(true));

                        dispatch(storeAuthInfo(result.data));

                        await setKey("auth", result.data);

                        await Preferences.set({
                            key: "email",
                            value: email,
                        });
                        await Preferences.set({
                            key: "password",
                            value: password,
                        });

                        if (from === "/") {
                            navigate("/dashboard");
                        } else {
                            navigate(from, { replace: true });
                        }
                    }
                });
        });
    };

    const onSubmitMobile = async (values) => {
        const email = values.email;
        const password = values.password;

        await dispatch(signInUser({ email, password }))
            .unwrap()
            .then(async (result) => {
                if (typeof result === "string") {
                    setErrMsg(await result);
                } else {
                    localStorage.setItem("userType", result.data.userType);
                    localStorage.setItem("loggedInFlag", JSON.stringify(true));

                    dispatch(storeAuthInfo(result.data));

                    await setKey("auth", result.data);

                    await Preferences.set({
                        key: "hasLoggedInBefore",
                        value: true,
                    });

                    await Preferences.set({
                        key: "email",
                        value: email,
                    });
                    await Preferences.set({
                        key: "password",
                        value: password,
                    });

                    if (from === "/") {
                        navigate("/dashboard");
                    } else {
                        navigate(from, { replace: true });
                    }
                }
            });
    };

    const onSubmitWeb = async (values) => {
        const email = values.email;
        const password = values.password;

        await dispatch(signInUser({ email, password }))
            .unwrap()
            .then(async (result) => {
                if (typeof result === "string") {
                    setErrMsg(await result);
                } else {
                    localStorage.setItem("userType", result.data.userType);
                    localStorage.setItem("loggedInFlag", JSON.stringify(true));

                    dispatch(storeAuthInfo(result.data));

                    await setKey("auth", result.data);

                    if (from === "/") {
                        navigate("/dashboard");
                    } else {
                        navigate(from, { replace: true });
                    }
                }
            });
    };

    const onSubmit = platform === "web" ? onSubmitWeb : onSubmitMobile;

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signinSchema,
        onSubmit,
    });

    const togglePersistCheckbox = () => {
        dispatch(togglePersist);
    };

    useEffect(() => {
        const biometricSignin = async () => {
            const { preferencesEmail, preferencesPassword } = await getPreferencesCredentials();

            if (!preferencesEmail?.value || !preferencesPassword?.value) {
                setErrMsg("Please use the sign-in form");
            } else {
                await signinWithBiometric(preferencesEmail.value, preferencesPassword.value);
            }
        };

        biometricSignin();
    }, []);

    useEffect(() => {
        getKey("auth")
            .then((result) => {
                setMobileAuth(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (mobileAuth?.accessToken || accessToken) {
            navigate("/dashboard");
        }
    });

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <>
            {isSubmitting && <TopBarProgress />}
            <p
                className={
                    errMsg
                        ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                        : "absolute -left-[99999px]"
                }
                aria-live="assertive"
            >
                <span className="flex items-center">
                    <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
                    {errMsg}
                </span>
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 my-2">
                    Email <span className="text-red-600">*</span>
                </label>
                <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    id="email"
                    autoComplete="false"
                    placeholder="johndoe@email.com"
                    className={` ${
                        errors.email && touched.email
                            ? "focus:ring-red-600"
                            : "focus:ring-ihs-green-shade-600"
                    } w-full border border-gray-300 px-3 py-2 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                />
                {errors.email && touched.email && (
                    <p className="text-red-500 normal-case text-xs mt-2">{errors.email}</p>
                )}

                <div className="flex justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-500 my-2">
                        Password <span className="text-red-600">*</span>
                    </label>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium my-2 text-ihs-green hover:underline"
                    >
                        <Link to="/reset-password">Forgot Password?</Link>
                    </label>
                </div>
                <span className="flex items-center">
                    <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={revealPwd ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        className={` ${
                            errors.password && touched.password
                                ? "focus:ring-red-600"
                                : "focus:ring-ihs-green-shade-600"
                        } w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                    />

                    {revealPwd ? (
                        <EyeOffIcon
                            className="w-4 -ml-6 text-gray-500"
                            onClick={() => setRevealPwd((prevState) => !prevState)}
                        />
                    ) : (
                        <EyeIcon
                            className="w-4 -ml-6 text-gray-500"
                            onClick={() => setRevealPwd((prevState) => !prevState)}
                        />
                    )}
                </span>

                {errors.password && touched.password && (
                    <p className="text-red-500 normal-case text-xs mt-2">{errors.password}</p>
                )}

                <span className="flex justify-start items-center pt-2">
                    <input
                        className="mr-1 accent-ihs-green-shade-500"
                        type="checkbox"
                        id="persist"
                        onChange={togglePersistCheckbox}
                        checked={persist}
                    />
                    <label className="text-sm font-light text-gray-600" htmlFor="persist">
                        Remember Password?
                    </label>
                </span>

                <button
                    type="submit"
                    disabled={Object.keys(errors).length > 0 || isSubmitting}
                    className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none px-4 py-2 w-full mt-5 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
                >
                    {isSubmitting ? "Submitting" : "Sign In"}
                </button>
            </form>
        </>
    );
};

export default SignInForm;
