// src/components/ReAuthModal.tsx

import React, { useState } from "react";

interface ReAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (otp: string) => void;
}

const ReAuthModal: React.FC<ReAuthModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    onConfirm(otp);
    setOtp("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl mb-4">Re-Authenticate</h2>
        <p>Please enter the OTP sent to your phone.</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="mt-2 p-2 border rounded w-full"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-200 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReAuthModal;
