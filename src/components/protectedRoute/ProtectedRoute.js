import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children, path }) => {
  const { getCurrentUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCurrentUser().then((data) => {
      if (data && data.id) {
        setUser(data);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null;

  return user ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Route>
      <Redirect to="/sign-in" />
    </Route>
  );
};

export default ProtectedRoute;
