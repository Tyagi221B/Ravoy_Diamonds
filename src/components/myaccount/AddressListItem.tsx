// src/components/AddressListItem.tsx

import React from "react";
import { Address } from "../../types/api-types";

// Define the props interface
interface AddressListItemProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
}

const AddressListItem: React.FC<AddressListItemProps> = ({ address, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-300 p-4 mb-2 rounded-md">
      <h3 className="text-lg font-semibold capitalize">{address.addressType}</h3>
      <p>
        {address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}
      </p>
      {address.phoneNumber && <p>Phone: {address.phoneNumber}</p>}
      <div className="mt-2">
        <button
          className="text-gray-600 text-sm font-semibold border rounded-lg bg-yellow-100 py-1 px-2 tracking-wide mr-2"
          onClick={() => onEdit(address)}
        >
          EDIT
        </button>
        <button
          className="text-gray-600 text-sm font-semibold border rounded-lg bg-red-100 py-1 px-2 tracking-wide"
          onClick={() => onDelete(address._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default AddressListItem;
