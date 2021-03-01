import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface UserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  user: UserGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ICookies {
  username: string;
  user: UserGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface ChallengesProviderProps {
  children: ReactNode;
  cookies: ICookies;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {

  const user = rest.cookies?.user;
  const username = rest.cookies?.username;

  const [level, setLevel] = useState(rest.cookies?.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.cookies?.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.cookies?.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {

    Cookies.set(`level_${username}`, String(level));
    Cookies.set(`currentExperience_${username}`, String(currentExperience));
    Cookies.set(`challengesCompleted_${username}`, String(challengesCompleted));

  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🐱‍🏍', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    // let it change
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  return (

    <ChallengesContext.Provider
      value={{
        user,
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >

      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}