import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getUser, signupUser, loginUser, logoutUser } from "../api/userApi";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentUser = async () => {
    const userData = await getUser();

    if (userData && userData.data) {
      setUser(userData.data.user);
      return userData.data.user;
    }

    if (userData && userData.error) {
      setUser(null);
      return userData;
    }
  };

  const signUserUp = async (userDetails) => {
    const userData = await signupUser(userDetails);

    if (userData && userData.data) {
      setUser(userData.data);
    }

    return userData;
  };

  const logUserIn = async (userDetails) => {
    const userData = await loginUser(userDetails);
    if (userData && userData.data) {
      setUser(userData.data.data);
    }

    return userData;
  };

  const logUserOut = async () => {
    const logout = await logoutUser();
    setUser(null);

    return logout;
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        setUser,
        getCurrentUser,
        signUserUp,
        logUserIn,
        logUserOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
