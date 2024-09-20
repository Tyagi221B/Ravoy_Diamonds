// src/components/AddressList.tsx

import React from "react";
import AddressListItem from "./AddressListItem";
import { Address } from "../../types/api-types";

// Define the props interface
interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onEdit, onDelete }) => {
  return (
    <div>
      {addresses.map((address) => (
        <AddressListItem key={address._id} address={address} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AddressList;
