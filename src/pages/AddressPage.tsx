// src/pages/AddressPage.tsx

import AddressForm from "../components/myaccount/AddressForm";
import AddressList from "../components/myaccount/AddressList";
import React, { useState } from "react";
import Sidebar from "../components/myaccount/Sidebar";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import {
  useGetAddressesForUserQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "../redux/api/AddressApi";
import { Address } from "../types/api-types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../components/ConfirmDialog";
import ReAuthModal from "../components/ReAuthModal";
import { useRequireReAuth } from "../hooks/ReAuth"; // Ensure this hook is implemented

// Address Form Interface
interface AddressFormState {
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: string;
}

const AddressPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id;

  // API Hooks
  const {
    data: addresses,
    error,
    isLoading,
    refetch,
  } = useGetAddressesForUserQuery(userId as string, { skip: !userId });

  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  // Re-authentication Hook
  const { reAuthToken, initiateReAuth, confirmReAuth, clearReAuth } = useRequireReAuth();

  // State for confirmation dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  // State for ReAuth Modal
  const [isReAuthModalOpen, setIsReAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  // Local state for form handling
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [formState, setFormState] = useState<AddressFormState>({
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    addressType: "home",
  });

  // Handle input changes in form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to handle re-authentication flow
  const handleReAuth = (action: () => void) => {
    setPendingAction(() => action);
    setIsReAuthModalOpen(true);
  };

  // Save or Update Address
  const handleSaveClick = async () => {
    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    // Initiate re-authentication before performing the action
    handleReAuth(async () => {
      try {
        if (selectedAddressId === null) {
          // Add new address
          await createAddress({ ...formState, userId }).unwrap();
          toast.success("Address added successfully!");
        } else {
          // Update existing address
          await updateAddress({
            addressId: selectedAddressId,
            data: { ...formState, userId },
          }).unwrap();
          toast.success("Address updated successfully!");
        }
        // Clear re-authentication token after successful operation
        clearReAuth();
        refetch(); // Refresh the addresses list
      } catch (error: any) {
        if (error.status === 401) {
          toast.error("Re-authentication failed. Please try again.");
          clearReAuth();
        } else {
          toast.error("Failed to save address. Please try again.");
        }
        console.error("Error saving address:", error);
      }

      // Reset form after save
      resetForm();
    });
  };

  // Reset form to initial state
  const resetForm = () => {
    setIsEditing(false);
    setFormState({
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      addressType: "home",
    });
    setSelectedAddressId(null);
  };

  // Add new address
  const handleAddAddressClick = () => {
    resetForm();
    setIsEditing(true);
  };

  // Edit existing address
  const handleEditAddressClick = (address: Address) => {
    setIsEditing(true);
    setSelectedAddressId(address._id);
    setFormState({
      phoneNumber: address.phoneNumber || "",
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      addressType: address.addressType || "home",
    });
  };

  // Initiate delete address (opens confirmation dialog)
  const handleDeleteAddressClick = (addressId: string) => {
    setAddressToDelete(addressId);
    setIsConfirmOpen(true);
  };

  // Confirm deletion
  const confirmDeleteAddress = async () => {
    if (!addressToDelete) return;

    // Initiate re-authentication before deleting
    handleReAuth(async () => {
      try {
        await deleteAddress({ addressId: addressToDelete }).unwrap();
        toast.success("Address deleted successfully!");
      } catch (error: any) {
        if (error.status === 401) {
          toast.error("Re-authentication failed. Please try again.");
          clearReAuth();
        } else {
          toast.error("Failed to delete address. Please try again.");
        }
        console.error("Error deleting address:", error);
      } finally {
        setIsConfirmOpen(false);
        setAddressToDelete(null);
      }
    });
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setAddressToDelete(null);
  };

  // Handle OTP confirmation from modal
  const handleReAuthConfirm = async (otp: string) => {
    const confirmed = await confirmReAuth(otp);
    setIsReAuthModalOpen(false);
    if (confirmed) {
      // Execute the pending action
      pendingAction();
    } else {
      toast.error("Re-authentication failed. Please try again.");
    }
  };

  // Handle ReAuth Modal close without action
  const handleReAuthCancel = () => {
    setIsReAuthModalOpen(false);
    setPendingAction(() => {});
  };

  // Render loading and error states
  if (!userId) return <div>Please log in to view your addresses.</div>;
  if (isLoading) return <div>Loading addresses...</div>;
  if (error) return <div>Error loading addresses. Please try again later.</div>;

  // Check if addresses is an array
  if (!Array.isArray(addresses)) {
    return <div>No addresses found. Please add a new address.</div>;
  }

  return (
    <div className="App font-Montaga One">
      <Header />
      <div className="hidden md:block">
        <Navigation />
      </div>
      <div className="container gap-[3%] mt-10 flex md:flex-row flex-col mx-auto px-4">
        <Sidebar />
        <div className="w-full md:w-2/3">
          <div className="rounded-xl bg-[#FFF9F3] px-16 pb-24 mx-auto">
            <div className="pt-12 pl-16 text-2xl text-gray-700 font-normal">
              ADDRESS BOOK
            </div>
            <div className="mt-6">
              {!isEditing && (
                <button
                  className="text-gray-600 text-sm font-semibold border rounded-lg bg-blue-100 py-1 px-2 tracking-wide mb-4"
                  onClick={handleAddAddressClick}
                >
                  ADD NEW ADDRESS
                </button>
              )}
              {isEditing ? (
                <AddressForm
                  formState={formState}
                  onChange={handleInputChange}
                  onSave={handleSaveClick}
                  onCancel={resetForm}
                  isEditing={selectedAddressId !== null}
                />
              ) : (
                <AddressList
                  addresses={addresses}
                  onEdit={handleEditAddressClick}
                  onDelete={handleDeleteAddressClick}
                />
              )}
              {addresses && addresses.length === 0 && !isEditing && (
                <div>No addresses found. Please add a new address.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this address? This action cannot be undone."
        onConfirm={confirmDeleteAddress}
        onCancel={cancelDelete}
      />
      <ReAuthModal
        isOpen={isReAuthModalOpen}
        onClose={handleReAuthCancel}
        onConfirm={handleReAuthConfirm}
      />
    </div>
  );
};

export default AddressPage;
