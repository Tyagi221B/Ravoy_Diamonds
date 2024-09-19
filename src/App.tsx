import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Rough from "./pages/Rough";
import {Toaster} from "react-hot-toast"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreUserFromStorage } from "./redux/reducer/userReducer";
import Account from "./components/myaccount/Account";
import Address from "./components/myaccount/Address";
import OrderSection from "./components/myaccount/OrderSection";
import TrackOrder from "./components/myaccount/TrackOrder";
import Wishlist from "./components/myaccount/Wishlist";

function App() {

	const dispatch = useDispatch();

  useEffect(() => {
    // Restore user from localStorage when the app loads
    dispatch(restoreUserFromStorage());
  }, [dispatch]);
	
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/rough" element={<Rough/>} />
				<Route path="/account" element={<Account />} />
            <Route path="/account/address" element={<Address />} />
            <Route path="/account/orderhistory" element={<OrderSection />} />
            <Route path="/account/trackorder" element={<TrackOrder />} />
            <Route path="/account/wishlist" element={<Wishlist />} /> 
			</Routes>
			<Toaster position="bottom-center" />
		</Router>
	);
}

export default App;
