import { useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";

import Cookies from "js-cookie";

import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from "../styles/pages/Ranking.module.css";
import { Container, Rank, Title, Grid } from "../styles/pages/Rank";

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
      <Container>
        <Menu />

        <Rank>
          <Title>Classificação</Title>

          <Grid>
            <span className="header-position">Posição</span>
            <span className="header-profile">Usuário</span>
            <span className="header-challenge">Desafios</span>
            <span className="header-experience">Experiência</span>

            {registersFilter &&
              registersFilter.map((register) => (
                <>
                  <span className="position" key={register.user.id}>
                    {register.position}
                  </span>
                  <span className="profile">
                    <img
                      src={register.user.avatar_url}
                      alt={register.user.name}
                    />
                    <div>
                      <strong>{register.user.name}</strong>
                      <p>
                        <img src="icons/level.svg" alt="" />
                        <span>Level {register.level}</span>
                      </p>
                    </div>
                  </span>
                  <span className="challenge">{register.challenges}</span>
                  <span className="experience">{register.experience} xp</span>
                </>
              ))}
          </Grid>
        </Rank>
        {/* <Grid>
          <span>Classificação</span>

          <Header>>
            <div className="header-position">Posição</div>
            <div className="header-user">Usuário</div>
            <div className="header-challenge">Desafios</div>
            <div className="header-experience">Experiência</div>
          </Header>

          {registersFilter &&
            registersFilter.map((register) => (
              <Rows key={register.user.id}>
                <div className="column-position">
                  <span>{register.position}</span>
                </div>

                <div className="column-user">
                  <img
                    src={register.user.avatar_url}
                    alt={register.user.name}
                  />
                  <div>
                    <strong>{register.user.name}</strong>
                    <p>
                      <img src="icons/level.svg" alt="" />
                      <span>Level {register.level}</span>
                    </p>
                  </div>
                </div>

                <div className="column-challenge">
                  <p>{register.challenges}</p>
                </div>

                <div className="column-experience">
                  <p>{register.experience}</p>
                  <span>xp</span>
                </div>
              </Rows>
            ))}
            </Grid>*/}
      </Container>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.cookies;

  return {
    props: { cookies },
  };
};
