import { useEffect, useState } from "react";
import { MenuStyles } from "../components/MenuStyles";

import Cookies from "js-cookie";

import styles from "../styles/pages/Ranking.module.css";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface IUserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

interface IRankingData {
  position: number;
  user: IUserGithub;
  level: number;
  challenges: number;
  experience: number;
}

export default function Ranking() {
  const [registersFilter, setRegistersFilter] = useState<IRankingData[]>([]);

  function compararNumeros(a, b) {
    return a - b;
  }

  useEffect(() => {
    let registersCookies: IRankingData[] = [];
    setRegistersFilter([]);

    const cookiesUsers = decodeURIComponent(Cookies.get("users"));

    const users = cookiesUsers.split(",");

    if (users?.length > 0) {
      for (var i = 0; i <= users.length - 1; i++) {
        const username = users[i];

        const id = Cookies.get("user_id_" + username);
        const name = Cookies.get("user_name_" + username);
        const avatar_url = Cookies.get("user_avatar_" + username);
        const level = Cookies.get("level_" + username);
        const currentExperience = Cookies.get("currentExperience_" + username);
        const challengeExperience = Cookies.get(
          "challengesCompleted_" + username
        );

        const data: IRankingData = {
          position: 0,
          user: {
            id,
            name,
            avatar_url,
          },
          level: Number(level),
          challenges: Number(challengeExperience),
          experience: Number(currentExperience),
        };

        registersCookies.push(data);
      }

      registersCookies = registersCookies.sort((n1, n2) => {
        if (n1.level < n2.level) {
          return 1;
        }

        if (n1.level > n2.level) {
          return -1;
        }

        return 0;
      });

      for (i = 0; i <= registersCookies.length - 1; i++) {
        registersCookies[i].position = i + 1;
      }

      setRegistersFilter(registersCookies);
    }
  }, []);

  return (
    <ChallengesProvider cookies={null}>
      <div className={styles.container}>
        <MenuStyles />

        <div className={styles.header}>
          <span>Classificação</span>
        </div>

        {registersFilter &&
          registersFilter.map((register) => (
            <div key={register.user.id} className={styles.card}>
              <div>
                <span>{register.position}</span>
              </div>

              <div className={styles.cardProfile}>
                <img src={register.user.avatar_url} alt={register.user.name} />
                <div>
                  <strong>{register.user.name}</strong>
                  <p>
                    <img src="icons/level.svg" alt="" />
                    <span>Level {register.level}</span>
                  </p>
                </div>
              </div>

              <div className={styles.cardChallenge}>
                <p>{register.challenges}</p>
                <span>desafios</span>
              </div>

              <div className={styles.cardExperience}>
                <p>{register.experience}</p>
                <span>xp</span>
              </div>
            </div>
          ))}
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.cookies;

  return {
    props: { cookies },
  };
};
