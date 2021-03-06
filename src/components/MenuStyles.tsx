import { Home, Award, LogOut } from "react-feather";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { Container, MenuBar } from "../styles/components/MenuStyles";
import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";

export function MenuStyles() {
  const { push } = useRouter();

  const {
    activeMenuHome,
    activeMenuRank,
    handleActiveMenuHome,
    handleActiveMenuRank,
  } = useContext(MenuContext);

  function handleHome() {
    handleActiveMenuHome();

    const username = decodeURIComponent(Cookies.get("username_now"));

    push(`/${username}`);
  }

  function handleRanking() {
    handleActiveMenuRank();
    push("/ranking");
  }

  function handleLogout() {
    push("/");
  }

  return (
    <Container>
      <img src="favicon-gray-orange.png" alt="Logo" />

      <MenuBar activeMenuHome={activeMenuHome} activeMenuRank={activeMenuRank}>
        <div className="grid-home">
          <Home size={24} onClick={handleHome} />
        </div>

        <div className="grid-ranking">
          <Award size={24} onClick={handleRanking} />
        </div>

        <div className="grid-logout">
          <LogOut size={24} onClick={handleLogout} />
        </div>
      </MenuBar>
    </Container>
  );
}
