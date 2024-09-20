// src/components/AddressForm.tsx

import React from "react";

// Define the props interface
interface AddressFormProps {
  formState: {
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  formState,
  onChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded-md">
      <h3 className="text-xl mb-4">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="street"
          value={formState.street}
          onChange={onChange}
          placeholder="Street"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          value={formState.city}
          onChange={onChange}
          placeholder="City"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="state"
          value={formState.state}
          onChange={onChange}
          placeholder="State"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={formState.zipCode}
          onChange={onChange}
          placeholder="Zip Code"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="country"
          value={formState.country}
          onChange={onChange}
          placeholder="Country"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={onChange}
          placeholder="Phone Number"
          className="p-2 border rounded"
        />
        <select
          name="addressType"
          value={formState.addressType}
          onChange={onChange}
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
          onClick={onSave}
        >
          {isEditing ? "SAVE CHANGES" : "ADD ADDRESS"}
        </button>
        <button
          className="text-gray-600 text-sm font-semibold border rounded-lg bg-gray-200 py-1 px-4 tracking-wide"
          onClick={onCancel}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
