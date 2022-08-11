import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function IsAdmin( { children } ) {
  
  const { isLoading, user } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading ...</p>
  } else if (user?.status === "admin" ) {
    return children
  } 
}

export default IsAdmin;
