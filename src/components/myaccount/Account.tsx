import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "../Header";
import Navigation from "../Navigation";
import { RootState } from "../../redux/store";

// Define the form data type
interface FormData {
  name: string;
  phone: string;
  email: string;
}

const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from Redux store
  const user = useSelector((state: RootState) => state.userReducer.user);

  // Define the initial form state, populating it from Redux user data
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  // If user is not available in Redux, attempt to load data from localStorage
  useEffect(() => {
    if (!user) {
      const storedData = localStorage.getItem("user" || "{}");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }
  }, [user]);

  // Toggle editing mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save changes and persist to localStorage
  const handleSaveClick = () => {
    setIsEditing(false);

    // Basic validation example (you can expand it)
    if (formData.phone.match(/^\d+$/)) {
      localStorage.setItem("user", JSON.stringify(formData));
    } else {
      alert("Please enter a valid phone number");
    }
  };

  return (
    <div>
      <div className="App font-Montaga One">
        <Header />
        <div className="hidden md:block">
          <Navigation />
        </div>
      </div>
      <div className="container gap-[3%] mt-10 flex md:flex-row flex-col mx-auto px-4">
        <div className="sidebar md:w-1/3">
          <Sidebar />
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-[#FFF9F3] rounded-2xl pb-24 mx-auto w-11/12">
          <div className="pt-12 pl-16 text-2xl text-gray-700 font-normal">
            ACCOUNT OVERVIEW
          </div>
          <div className="border border-blue-300 mx-10 mt-6">
            <div className="bg-gray-100 flex justify-between items-center">
              <div className="text-xl text-gray-700 py-4 pl-6 font-medium">
                Personal Information
              </div>
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="text-sm border text-gray-500 rounded-lg bg-blue-100 py-1 px-2 mr-5 tracking-wide"
              >
                {isEditing ? "SAVE" : "EDIT DETAILS"}
              </button>
            </div>

            {/* Profile Form Fields */}
            <ProfileForm
              formData={formData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden pb-24 w-full">
          <div className="mt-6">
            <div className="bg-orange-100 flex justify-between items-center">
              <div className="text-lg text-gray-500 py-4 pl-6 font-medium">
                PERSONAL INFORMATION
              </div>
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="text-gray-600 text-sm font-semibold border border-transparent rounded-lg bg-blue-100 py-1 px-6 mr-5 tracking-wide"
              >
                {isEditing ? "SAVE" : "EDIT DETAILS"}
              </button>
            </div>

            {/* Profile Form Fields for Mobile */}
            <ProfileForm
              formData={formData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileFormProps {
  formData: FormData;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Extracted Profile Form for reusability between desktop and mobile
const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  isEditing,
  handleInputChange,
}) => (
  <div className="flex flex-col font-sans">
    <ProfileField
      label="Name"
      name="name"
      value={formData.name}
      isEditing={isEditing}
      handleInputChange={handleInputChange}
    />
    <ProfileField
      label="Phone Number"
      name="phone"
      value={formData.phone}
      isEditing={isEditing}
      handleInputChange={handleInputChange}
    />
    <ProfileField
      label="Email Address"
      name="email"
      value={formData.email}
      isEditing={isEditing}
      handleInputChange={handleInputChange}
    />
  </div>
);

interface ProfileFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Reusable Profile Field
const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  name,
  value,
  isEditing,
  handleInputChange,
}) => (
  <div className="flex mb-2 py-2 text-base">
    <span className="w-36 pl-6 font-normal text-gray-500">{label}</span>
    <span className="px-2 text-gray-500">:</span>
    {isEditing ? (
      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="font-semibold text-gray-600"
      />
    ) : (
      <span className="font-semibold text-gray-600">{value}</span>
    )}
  </div>
);

export default Account;
