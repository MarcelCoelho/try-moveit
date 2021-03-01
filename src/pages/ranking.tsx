import { useEffect, useState } from 'react';
import { Menu } from '../components/Menu';

import Cookies from 'cookies';
import cookie from 'js-cookie';

import styles from '../styles/pages/Ranking.module.css';
import { GetServerSideProps } from 'next';

interface IUserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

interface IRankingData {
  user: IUserGithub;
  level: number;
  challenges: number;
  experience: number;
}

interface RankingProps {
  cookies
}

export default function Ranking(props: RankingProps) {

  let [registersFilter, setRegistersFilter] = useState<IRankingData[]>([]);

  useEffect(() => {

    for (var i = 0; i < props.cookies; i++) {

    }

  }, [])

  return (
    <div className={styles.container}>
      <Menu />

      <div className={styles.card}>

        <div className={styles.cardPosition}>
          <span>1</span>
        </div>
        <div className={styles.cardProfile}>

          <img src="https://avatars.githubusercontent.com/u/39440678?v=4" alt="" />
          <div>
            <strong>Marcel Coelho</strong>
            <p>
              <img src="icons/level.svg" alt="" />
          Level 2</p>
          </div>

        </div>

        <div className={styles.cardChallenge}>
          <span>200 completados</span>
        </div>

        <div className={styles.cardExperience}>
          <span>15155 xp</span>
        </div>

      </div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const cookies = ctx.req.cookies;

  return {
    props: { cookies }
  }
}