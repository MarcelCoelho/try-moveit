import { createContext, ReactNode, useState } from "react";

interface MenuContextData {
  activeMenuHome: boolean;
  activeMenuRank: boolean;
  handleActiveMenuHome: () => void;
  handleActiveMenuRank: () => void;
}

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuContext = createContext({} as MenuContextData);

export function MenuProvider({ children }: MenuProviderProps) {
  /* const [activeMenuHome, setActiveMenuHome] = useState(true);
  const [activeMenuRank, setActiveMenuRank] = useState(false);

  function handleActiveMenuHome() {
    setActiveMenuHome(true);
    setActiveMenuRank(false);
  }

  function handleActiveMenuRank() {
    setActiveMenuHome(false);
    setActiveMenuRank(true);
  }*/
  /*return (
    <MenuContext.Provider
      value={{
        activeMenuHome,
        activeMenuRank,
        handleActiveMenuHome,
        handleActiveMenuRank,
      }}
    >
      {children}
    </MenuContext.Provider>
  );*/
}
