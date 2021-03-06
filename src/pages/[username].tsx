import Head from 'next/head';
import Cookies from 'cookies';

import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenge';
import { Countdown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { Menu } from '../components/Menu';

interface UserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

interface ICookies {
  username: string;
  user: UserGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Challenges(props: ICookies) {

  const cookie_data = props;

  return (
    <ChallengesProvider
      cookies={cookie_data} >

      <div className={styles.container}>

        <Menu />

        <div className={styles.bodyMoveit}>

          <Head>
            <title>Inicio | move.it</title>
          </Head>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile {...cookie_data?.user} />
                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>

        </div>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { username } = ctx.params;

  const cookies = new Cookies(ctx.req, ctx.res)

  const id = cookies.get(`user_id_${username}`);
  const name = cookies.get(`user_name_${username}`);
  const avatar_url = cookies.get(`user_avatar_${username}`);
  const level = cookies.get(`level_${username}`);
  const currentExperience = cookies.get(`currentExperience_${username}`);
  const challengesCompleted = cookies.get(`challengesCompleted_${username}`);

  const usernametype = String(username);

  let cookie_data: ICookies = {
    username: usernametype,
    user: {
      id,
      name: decodeURIComponent(name),
      avatar_url
    },
    level: Number(level ?? 1),
    currentExperience: Number(currentExperience ?? 0),
    challengesCompleted: Number(challengesCompleted ?? 0),
  };

  return {
    props: {
      username: username,
      user: {
        id: cookie_data.user.id,
        name: cookie_data.user.name,
        avatar_url: cookie_data.user.avatar_url
      },
      level: cookie_data.level,
      currentExperience: cookie_data.currentExperience,
      challengesCompleted: cookie_data.challengesCompleted
    }
  }
}