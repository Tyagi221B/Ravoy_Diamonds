import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../Header";
import Navigation from "../Navigation";
import {
  useGetAddressesForUserQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "../../redux/api/AddressApi";
import { Address } from "../../types/api-types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../ConfirmDialog";

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
  } = useGetAddressesForUserQuery(userId as string, { skip: !userId });

  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  // State for confirmation dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  // Local state for form handling
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
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

  // Save or Update Address
  const handleSaveClick = async () => {
    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

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
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
      console.error("Error saving address:", error);
    }

    // Reset form after save
    resetForm();
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

    try {
      await deleteAddress({ addressId: addressToDelete }).unwrap();
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address. Please try again.");
      console.error("Error deleting address:", error);
    } finally {
      setIsConfirmOpen(false);
      setAddressToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setAddressToDelete(null);
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
                <div className="bg-gray-100 p-4 mb-4">
                  <h3 className="text-xl mb-4">
                    {selectedAddressId === null
                      ? "Add New Address"
                      : "Edit Address"}
                  </h3>
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      name="street"
                      value={formState.street}
                      onChange={handleInputChange}
                      placeholder="Street"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={formState.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      value={formState.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formState.zipCode}
                      onChange={handleInputChange}
                      placeholder="Zip Code"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      value={formState.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="p-2 border rounded"
                    />
                    <select
                      name="addressType"
                      value={formState.addressType}
                      onChange={handleInputChange}
                      className="p-2 border rounded"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="billing">Billing</option>
                      <option value="shipping">Shipping</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <button
                      className="text-gray-600 text-sm font-semibold border rounded-lg bg-blue-100 py-1 px-4 tracking-wide mr-2"
                      onClick={handleSaveClick}
                    >
                      {selectedAddressId === null
                        ? "ADD ADDRESS"
                        : "SAVE CHANGES"}
                    </button>
                    <button
                      className="text-gray-600 text-sm font-semibold border rounded-lg bg-gray-200 py-1 px-4 tracking-wide"
                      onClick={resetForm}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                addresses.map((address: Address) => (
                  <div
                    key={address._id}
                    className="border border-gray-300 p-4 mb-2 rounded-md"
                  >
                    <h3 className="text-lg font-semibold capitalize">
                      {address.addressType}
                    </h3>
                    <p>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.zipCode}, {address.country}
                    </p>
                    <p>Phone: {address.phoneNumber}</p>
                    <div className="mt-2">
                      <button
                        className="text-gray-600 text-sm font-semibold border rounded-lg bg-yellow-100 py-1 px-2 tracking-wide mr-2"
                        onClick={() => handleEditAddressClick(address)}
                      >
                        EDIT
                      </button>
                      <button
                        className="text-gray-600 text-sm font-semibold border rounded-lg bg-red-100 py-1 px-2 tracking-wide"
                        onClick={() =>
                          handleDeleteAddressClick(address._id)
                        }
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))
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
    </div>
  );
};

export default AddressPage;
