import { useState } from "react";
import "../styles/global.css";

import { MenuContext } from "../contexts/MenuContext";

function MyApp({ Component, pageProps }) {
  const [activeMenuHome, setActiveMenuHome] = useState(true);
  const [activeMenuRank, setActiveMenuRank] = useState(false);

  function handleActiveMenuHome() {
    setActiveMenuHome(true);
    setActiveMenuRank(false);
  }

  function handleActiveMenuRank() {
    setActiveMenuHome(false);
    setActiveMenuRank(true);
  }

  return (
    <MenuContext.Provider
      value={{
        activeMenuHome,
        activeMenuRank,
        handleActiveMenuHome,
        handleActiveMenuRank,
      }}
    >
      <Component {...pageProps} />;
    </MenuContext.Provider>
  );
}
export default MyApp;
