import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setReAuthToken, clearReAuthToken } from "../redux/reducer/userReducer";
import { useSendReAuthOtpMutation, useVerifyReAuthOtpMutation } from "../redux/api/ReAuthApi"; // Assuming you have these hooks

export const useRequireReAuth = () => {
  const dispatch = useDispatch();
  const reAuthToken = useSelector((state: RootState) => state.userReducer.reAuthToken);
  const [sendReAuthOtp] = useSendReAuthOtpMutation();
  const [verifyReAuthOtp] = useVerifyReAuthOtpMutation();

  const initiateReAuth = async () => {
    try {
      await sendReAuthOtp().unwrap(); // Adjust according to your API
      return true;
    } catch (error) {
      console.error("Error sending re-auth OTP:", error);
      return false;
    }
  };

  const confirmReAuth = async (otp: string) => {
    try {
      const response = await verifyReAuthOtp({ otp }).unwrap();
      dispatch(setReAuthToken(response.reAuthToken));
      return true;
    } catch (error) {
      console.error("Error verifying re-auth OTP:", error);
      return false;
    }
  };

  const clearReAuth = () => {
    dispatch(clearReAuthToken());
  };

  return { reAuthToken, initiateReAuth, confirmReAuth, clearReAuth };
};
