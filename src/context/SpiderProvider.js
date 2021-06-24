import React, { useState } from "react";
import { SpiderContext } from "./SpiderContext";

const SpiderProvider = ({ children }) => {
  const [spider, setSpider] = useState(null);

  return (
    <SpiderContext.Provider value={{ spider, setSpider }}>
      {children}
    </SpiderContext.Provider>
  );
};

export default SpiderProvider;
