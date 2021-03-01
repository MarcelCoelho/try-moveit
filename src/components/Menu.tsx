import { Home, Award } from 'react-feather';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import styles from '../styles/components/Menu.module.css';

export function Menu() {

  const { push } = useRouter();

  function handleHome() {
    let username = Cookies.get('user_name');
    username = username.replace(/\s+/g, '');

    push(`/${username}`);
  }

  function handleRanking() {
    push('/ranking');
  }

  return (
    <div className={styles.menuContainer}>

      <img src="favicon-gray-orange.png" alt="Logo" />

      <div className={styles.menuBar}>
        <div className={styles.menuHome}>
          <Home color="#B35710" size={24} onClick={handleHome} />
        </div>

        <div className={styles.menuRanking}>
          <Award color="#B35710" size={24} onClick={handleRanking} />
        </div>
      </div>
    </div >
  );
}