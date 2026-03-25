import { createContext, useEffect } from "react";

import { useState } from "react";

export const StoreContext = createContext(null);

// import universalCookie from "universal-cookie";


function StoreContextProvider(props) {
  console.log("StoreContextProvider component rendered");

  // const cookies = new universalCookie();

  
  // const [token, setToken] = useState(cookies.get("authToken") || null); // Initialize token state with cookie value or null

  // console.log("token storeContext",token)
  const [isLogin, setLogin] = useState(false);

  const contextValue = {
    isLogin,
    setLogin,
    // token,
    // setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}
export default StoreContextProvider;

