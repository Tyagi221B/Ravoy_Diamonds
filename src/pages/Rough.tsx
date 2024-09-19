
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Rough = () => {
  const { user } = useSelector(
		(state: RootState) => state.userReducer
	);

  
  return (
    <div>
      {user ? <p>Welcome, {user.name}</p> : <p>No user logged in.</p>}
    </div>
  );
}

export default Rough