// import {
//   Bar,
//   CartItem,
//   Line,
//   Order,
//   Pie,
//   Product,
//   ShippingInfo,
//   Stats,
//   User,
// } from "./types";
import {
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success?: boolean;
  message: string;
};
export type getUserInfoResponse = {
  success?: boolean;
  user: User;
}

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductsResponse = {
  success: boolean;
  // products: Product[];
};

// For fetching a list of addresses
export interface Address {
  _id: string; // MongoDB ObjectId
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  addressType: string; 
  createdAt?: string; 
  updatedAt?: string;
}

export interface AddressResponse {
  success: boolean;
  message?: string;
  addresses: Address[];
}

// For fetching a single address
export interface SingleAddressResponse {
  success: boolean;
  message?: string;
  address: Address;
}

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
// export type ProductResponse = {
//   success: boolean;
//   product: Product;
// };

// export type AllOrdersResponse = {
//   success: boolean;
//   orders: Order[];
// };
// export type OrderDetailsResponse = {
//   success: boolean;
//   order: Order;
// };

// export type StatsResponse = {
//   success: boolean;
//   stats: Stats;
// };

// export type PieResponse = {
//   success: boolean;
//   charts: Pie;
// };

// export type BarResponse = {
//   success: boolean;
//   charts: Bar;
// };

// export type LineResponse = {
//   success: boolean;
//   charts: Line;
// };

// export type NewProductRequest = {
//   id: string;
//   formData: FormData;
// };
// export type NewCategoryResponse = {
//   id: string;
//   cateforyFormData: FormData;
// };
// export type UpdateProductRequest = {
//   userId: string;
//   productId: string;
//   formData: FormData;
// };
// export type DeleteProductRequest = {
//   userId: string;
//   productId: string;
// };

// export type NewOrderRequest = {
//   shippingInfo: ShippingInfo;
//   orderItems: CartItem[];
//   subtotal: number;
//   tax: number;
//   shippingCharges: number;
//   discount: number;
//   total: number;
//   user: string;
// };

// export type UpdateOrderRequest = {
//   userId: string;
//   orderId: string;
// };

// export type DeleteUserRequest = {
//   userId: string;
//   adminUserId: string;
// };
