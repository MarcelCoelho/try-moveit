import { Home, Award, LogOut } from "react-feather";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import styles from "../styles/components/Menu.module.css";

export function Menu() {
  const { push } = useRouter();

  function handleHome() {
    const username = decodeURIComponent(Cookies.get("username_now"));

    push(`/${username}`);
  }

  function handleRanking() {
    push("/ranking");
  }

  function handleLogout() {
    push("/");
  }

  return (
    <div className={styles.menuContainer}>
      <img src="favicon-gray-orange.png" alt="Logo" />

      <div className={styles.menuBar}>
        <div className={styles.menuHome}>
          <p>
            <Home color="#B35710" size={24} onClick={handleHome} />
          </p>
        </div>

        <div className={styles.menuRanking}>
          <p>
            <Award color="#B35710" size={24} onClick={handleRanking} />
          </p>
        </div>

        <div className={styles.menuLogout}>
          <p>
            <LogOut color="black" size={24} onClick={handleLogout} />
          </p>
        </div>
      </div>
    </div>
  );
}
