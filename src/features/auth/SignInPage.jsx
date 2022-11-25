import {Helmet, HelmetProvider} from "react-helmet-async";
import Logo from "../../components/Logo";
import {Link} from "react-router-dom";
import SignInForm from "./SignInForm";

const SignInPage = () => {
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Sign In | IHS</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
					<div className="py-20">
						<div className="flex flex-col justify-center items-center py-4">
							<Logo />
							<h1 className="md:text-4xl text-2xl text-ihs-green pt-20">Sign in to your account</h1>
							<p className="text-sm py-2">Don't have an account? <span className="text-ihs-green hover:underline"><Link to="/signup">Sign Up</Link></span></p>
						</div>
						<div className="flex justify-around">
							<div className="bg-white lg:w-1/3 md:w-2/3 w-full md:px-16 md:py-16 px-10 md:rounded-3xl md:shadow-lg">
								<SignInForm />
							</div>
						</div>
					</div>
				</>
			</>
		</HelmetProvider>
	);
};

export default SignInPage;