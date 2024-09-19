import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducer/userReducer";
import {
  useRegisterUserMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  getUser,
} from "../redux/api/UserApi";
import { User } from "../types/types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"phone" | "otp" | "form" | "success">("phone");
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const [requestOtp] = useRequestOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [registerUser] = useRegisterUserMutation();

  // Phone validation
  const isValidPhoneNumber = (phone: string) => {
    const cleanedPhone = phone.replace(/[^\d+]/g, ""); // Remove non-digits except +
    const phoneRegex = /^\+\d{10,}$/;
    return phoneRegex.test(cleanedPhone);
  };

  // Centralized error handler
  const handleError = (error: any) => {
    if (error?.status === 400) {
      setErrorMessage("Invalid phone number. Please try again.");
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Handle sending OTP
  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    try {
      await requestOtp({ phone }).unwrap();
      toast.success("OTP sent successfully!");
      setStep("otp");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setErrorMessage("Please enter the OTP code.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOtp({ phone, otp }).unwrap();
      if (response.status === "OK" && !response.register) {
        const userResponse = await getUser(phone);
        const user: User = userResponse.user;
        dispatch(userExist(user));
        toast.success("Logged in successfully!"); 
        setStep("success");
        onClose();
      } else {
        setStep("form");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signing up new users
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setErrorMessage("Please enter all required details.");
      return;
    }
    setIsLoading(true);
    try {
      await registerUser({
        name: formData.fullName,
        email: formData.email,
        phone,
      }).unwrap();

      const userResponse = await getUser(phone);
      dispatch(userExist(userResponse.user));
      toast.success("Registered successfully!");
      setStep("success");
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <AnimatePresence>
              {step === "phone" && (
                <motion.form
                  key="phone"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="p-6"
                  onSubmit={handleRequestOtp}
                >
                  <h2 className="text-2xl font-semibold mb-4">Enter Your Phone Number</h2>
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Requesting OTP..." : "Request OTP"}
                  </button>
                </motion.form>
              )}

              {step === "otp" && (
                <motion.form
                  key="otp"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="p-6"
                  onSubmit={handleVerifyOtp}
                >
                  <h2 className="text-2xl font-semibold mb-4">Verify Mobile OTP</h2>
                  <p className="mb-4">OTP sent to: {phone}</p>
                  <input
                    type="text"
                    className="w-full h-12 text-center border rounded-md mb-4"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </button>
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
                  onSubmit={handleSignup}
                >
                  <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </motion.form>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="p-6 text-center"
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Welcome, {formData.fullName || "User"}!
                  </h2>
                  <p>You have successfully logged in.</p>
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={onClose}
                  >
                    Continue
                  </button>
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
