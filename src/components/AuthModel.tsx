import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "../assets/images";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/userReducer";

import {
	useRegisterUserMutation,
	useRequestOtpMutation,
	useVerifyOtpMutation,
	getUser,
} from "../redux/api/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
	const [step, setStep] = useState("choice");
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
	});
	const [showCongrats, setShowCongrats] = useState(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [requestOtp, { isLoading: isRequestingOtp }] = useRequestOtpMutation();
	const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState<string>("");
	const [isVerified, setIsVerified] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [otpReceived, setOtpReceived] = useState(false);
	const [isLoadingg, setIsLoading] = useState(false);


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!phone) {
			setErrorMessage("Please enter your phone number");
			return;
		}

		try {
			const responseofotp = await requestOtp({ phone }).unwrap();
			console.log("Otp sent successfully");
			console.log(responseofotp);
			setErrorMessage(""); 
			setOtpReceived(true);
			setStep("otp");
		} catch (error) {
			console.error("Failed to request OTP:", error);
			setErrorMessage(
				"An error occurred while requesting OTP. Please try again."
			);
			setOtpReceived(false);
		}
	};

	const handleVerifyOtp = async () => {
		if (!otp) {
			setErrorMessage("Please enter the OTP code");
			return;
		}

		try {
			const response = await verifyOtp({ phone, otp }).unwrap();
			if(response.status === "OK"){
				const user = await getUser(response.user.phone);
				console.log(user);
        dispatch(userExist(user.user));
        toast.success("User logged in successfully");
        onClose();
			}
			setIsVerified(true);
			setErrorMessage(""); 
			setStep("form");
			console.log(response);
		} catch (error) {
			console.error("Failed to verify OTP:", error);
			setErrorMessage("Invalid OTP code. Please try again.");
		}
	};

	useEffect(() => {
		if (otpReceived && !otp) {
			setErrorMessage("OTP received. Please enter the code.");
		}
	}, [otpReceived, otp]);

	const handleCongratsClose = () => {
		setShowCongrats(false);
	};

	const [login] = useRegisterUserMutation();
	const dispatch = useDispatch();

	interface MessageResponse {
		message: string;
	}
	
	interface UserResponse {
		message: string;
		accessToken: string;
		refreshToken: string;
		status:string;
		user: {
			name: string;
			email: string;
			phone: string;
			role: string;
			_id: string;
			createdAt: string;
			updatedAt: string;
			refreshToken:string;
			__v: number;
		};
	}
	
	const handleLogin = async () => {
		try {
			setIsLoading(true); // Start loading
	
			const res = await login({
				name: formData.fullName,
				email: formData.email,
				phone: phone,
			});
	
			if (res && "data" in res) {
				const responseData = res.data as UserResponse; 
				
				toast.success(responseData.message || "Logged in successfully!");
	
				const data = await getUser(phone);
	
				if (data && data.user) {
					setStep("success")
					dispatch(userExist(data.user));
				} else {
					toast.error("Failed to fetch user data.");
				}
			} else {
				// Handle error scenario if 'data' is not present
				const error = res.error as FetchBaseQueryError;
				const message = (error.data as MessageResponse)?.message || "An error occurred while logging in.";
				toast.error(message);
				dispatch(userNotExist());
			}
		} catch (error: any) {
			toast.error("Sign In Failed. Please try again later.");
			console.error("Login error:", error);
		} finally {
			setIsLoading(false); // End loading
		}
	};

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
		exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
	};

	const contentVariants = {
		hidden: { x: -20, opacity: 0 },
		visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
	};


	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
					>
						<AnimatePresence mode="wait">
							{step === "choice" && (
								<motion.div
									key="choice"
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-8 text-center"
								>
									<h2 className="text-3xl font-bold text-[#3093CB] mb-2">
										MY ACCOUNT
									</h2>
									<p className="text-gray-600 mb-6">
										LOGIN OR SIGNUP TO ACCESS YOUR ACCOUNT
									</p>
									<div className="flex gap-2">
										<button
											onClick={() => setStep("login")}
											className="w-full py-2 px-4 border-2 border-[#3093CB] text-[#3093CB] hover:bg-blue-50 transition duration-300"
										>
											LOGIN
										</button>
										<button
											onClick={() => setStep("signup")}
											className="w-full py-2 px-4 bg-[#3093CB] text-white hover:bg-white hover:text-[#3093CB] hover:border-2 transition duration-300"
										>
											SIGNUP
										</button>
									</div>
									<p className="mt-6 text-gray-500 text-sm cursor-pointer hover:underline">
										Click here to contact us
									</p>
								</motion.div>
							)}

							{["login", "signup"].includes(step) && (
								<motion.form
									key={step}
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-6"
									onSubmit={handleSubmit}
								>
									<h2 className="text-2xl font-semibold text-[#3093CB] text-center uppercase mb-4">
										{step === "login" ? "Login" : "Signup"}
									</h2>
									<div className="flex justify-center text-center items-center">
										<img
											className="rounded-md mb-10"
											src={images.Ring5}
											alt="Ring"
										/>
									</div>
									<div className="mb-4 flex">
										<select className="px-3 py-2 border rounded-l-md bg-gray-100">
											<option>+91</option>
										</select>
										<input
											type="tel"
											name="mobile"
											placeholder="Enter Your Mobile no."
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="flex-1 px-3 py-2 border rounded-r-md"
											required
										/>
									</div>
									<button
										type="submit"
										className="w-full bg-blue-500 text-white py-2 rounded-md"
										disabled={isRequestingOtp}
									>
										{isRequestingOtp ? "Requesting OTP..." : "Request OTP"}
									</button>
									{errorMessage && (
										<p className="error-message">{errorMessage}</p>
									)}
									<p className="text-sm text-center mt-4">
										By continuing, I agree to Terms of Use & Privacy Policy
									</p>
								</motion.form>
							)}

							{step === "otp" && otpReceived && (
								<motion.form
									key="otp"
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-6"
									onSubmit={handleVerifyOtp}
								>
									<h2 className="text-2xl font-semibold mb-4">
										Verify Mobile OTP
									</h2>
									<p className="mb-4">OTP Sent to Mobile No.: {phone}</p>
									<div className="flex justify-between mb-4">
										<input
											type="text"
											className="w-full h-12 text-center border rounded-md"
											value={otp!}
											onChange={(e) => setOtp(e.target.value)}
										/>
									</div>
									<p className="text-sm mb-4">Resend OTP? Request in 2:00</p>
									<button
										type="button"
										disabled={isVerifyingOtp}
										onClick={handleVerifyOtp}
										className="w-full bg-blue-500 text-white py-2 rounded-md"
									>
										{isVerifyingOtp ? "Verifying..." : "Verify OTP"}
									</button>
									{errorMessage && (
										<p className="error-message">{errorMessage}</p>
									)}
									<p className="text-sm text-center mt-4">
										By continuing, I agree to Terms of Use & Privacy Policy
									</p>
								</motion.form>
							)}

							{step === "form" && (
								<motion.form
									key="form"
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-6"
									onSubmit={handleLogin}
								>
									<h2 className="text-2xl font-semibold mb-4 text-[#3093CB] text-center">
										Complete Your Profile
									</h2>
									<div className="mb-4">
										<input
											type="text"
											name="phone"
											placeholder={phone}
											value=""
											className="w-full px-3 py-2 border rounded-md"
										/>
									</div>
									<div className="mb-4">
										<input
											type="text"
											name="fullName"
											placeholder="Enter Full Name"
											value={formData.fullName}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border rounded-md"
											required
										/>
									</div>
									<div className="mb-4">
										<input
											type="email"
											name="email"
											placeholder="Enter Email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border rounded-md"
											required
										/>
									</div>
									<button
										type="submit"
										className="w-full bg-blue-500 text-white py-2 rounded-md"
										disabled={isRequestingOtp}
									>
										Submit
									</button>
								</motion.form>
							)}

							{step === "success" && showCongrats && (
								<motion.div
									key="congrats"
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-6 text-center"
								>
									<h2 className="text-2xl font-semibold mb-4">
										Welcome, {formData.fullName}!
									</h2>
									<p>You have successfully completed your profile.</p>
									<button
										onClick={handleCongratsClose}
										className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
									>
										Continue
									</button>
								</motion.div>
							)}

							{step === "success" && !showCongrats && (
								<motion.div
									key="account"
									variants={contentVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
									className="p-8 pe-28 font-sans text-center absolute top-[10%] bg-white rounded-2xl right-[6%]"
								>
									<div
										style={{ backgroundImage: `url(${images.flower1})` }}
										className="bg-cover bg-center p-4"
									>
										<h2 className="text-2xl text-blue-500 tracking-wide font-semibold mb-4">
											HI {formData.fullName || "User"}!!
										</h2>
										<p className="text-sm font-medium mb-4">{phone}</p>
									</div>

									<div className="text-left">
										<a
											href="/account"
											className="text-gray-500 hover:text-blue-400 block mb-2"
										>
											→ My Account
										</a>
										<hr className="border" />
										<a
											href="/account/orderhistory"
											className="text-gray-500 hover:text-blue-400 block mb-2"
										>
											→ Order History
										</a>
										<hr className="border" />
										<a
											href="/account/trackorder"
											className="text-gray-500 hover:text-blue-400 block mb-2"
										>
											→ Track Order
										</a>
										<hr className="border" />
										<a
											href="/account/wishlist"
											className="text-gray-500 hover:text-blue-400 block mb-2"
										>
											→ Wishlist
										</a>
										<hr className="border" />
										<a
											href="#"
											className="text-gray-500 hover:text-blue-400 block mb-2"
										>
											→ Log Out
										</a>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
export default AuthModal;
