import {  User } from "./types";
// import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
  reAuthToken: string;
  accessToken: string;
}

// export interface CartReducerInitialState {
//   loading: boolean;
//   cartItems: CartItem[];
//   subtotal: number;
//   tax: number;
//   shippingCharges: number;
//   discount: number;
//   total: number;
//   shippingInfo: ShippingInfo;
// }
