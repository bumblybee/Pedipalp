import { useState, useEffect, useContext, useCallback } from "react";
import { NotificationContext } from "../context/notification/NotificationContext";
import { pushToLogin } from "../utils/customHistory";

const useCRUD = (getter, setter, destroyer) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotificationMessage, clearNotificationMessage } =
    useContext(NotificationContext);

  const handleErrors = (res) => {
    if (res.error) {
      setNotificationMessage(res.error, "error", true);
    }

    if (res.error === "Your session has expired.") {
      pushToLogin();
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);

    const { api, data } = getter;
    const res = await api(data);

    handleErrors(res);

    setState(
      res && res.data && res.data.length
        ? [...res.data]
        : res && res.data && res.data
    );

    setLoading(false);
  }, [getter.api, setNotificationMessage]);

  const setData = async (data, id) => {
    if (data) {
      const res = await setter(data, id);

      handleErrors(res);

      if (res && res.error) {
        setNotificationMessage(res.error, "error", true);

        if (res.error === "Your session has expired.") {
          pushToLogin();
        }
        return;
      }

      clearNotificationMessage();
      setState(res && res.data && res.data.length ? [...res.data] : []);
    }
  };

  const destroyData = async (id) => {
    const res = await destroyer(id);

    handleErrors(res);

    setState(res && res.data && res.data.length ? [...res.data] : []);
  };

  useEffect(() => {
    getData();
  }, []);

  return [loading, state, setData, destroyData];
};

export default useCRUD;
