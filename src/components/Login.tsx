import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import axios from 'axios';

import { FiGithub, FiLogIn } from 'react-icons/fi';
import styles from '../styles/components/Login.module.css';

interface UserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

export function Login() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [userName, setUsername] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [notIsValidUser, setNotIsValidUser] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    inputRef?.current.focus();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let errorExpcetion;

    try {
      if (userName) {

        const api = axios.create({
          baseURL: "https://api.github.com/users",
        });

        //const user = await api.get<UserGithub>(`/${userName}`);

        //const user = await getUser(userName);
        const user = await axios.post<UserGithub>('/api/getUserGithub', { user: userName });

        const usersRecuperados = Cookies.get('users');

        const users = decodeURIComponent(usersRecuperados)?.split(',');

        let usersCookies = userName;

        if (users?.length > 1) {

          for (var i = 0; i <= users?.length - 1; i++) {

            const userOk = users[i];

            if (userOk != 'undefined' && userOk != userName) {
              usersCookies = usersCookies + ',' + userOk;
            }
          }
        }
        else {
          if (users[0] != 'undefined') {
            usersCookies = usersCookies + ',' + users[0];
          }
        }

        if (user?.data && user?.data.name != null) {
          setNotIsValidUser(false);
          Cookies.set('username_now', userName);
          Cookies.set(`user_id_${userName}`, user.data.id);
          Cookies.set(`user_name_${userName}`, user.data.name);
          Cookies.set(`user_avatar_${userName}`, user.data.avatar_url);
          Cookies.set('users', usersCookies);
          push(`/${userName}`);
        }
        else {
          setErrorDescription(`Usuário (${userName}) não encontrado no Github.`);
          setNotIsValidUser(true);
          setUsername('');
          inputRef.current.focus();
        }
      }
      else {
        setErrorDescription('É obrigatório informar algum usuário!')
        setNotIsValidUser(true);
        inputRef.current.focus();
      }

    } catch (error) {
      errorExpcetion = error;
    }

    if (errorExpcetion) {
      setErrorDescription(`Erro: ${errorExpcetion.message}. Tente novamente!`);
      setNotIsValidUser(true);
      setUsername('');
      inputRef.current.focus();
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="logo/logo-full-orange-880.png" alt="Logo" />
        <strong>Bem-vindo</strong>

        <div className={styles.title}>
          <FiGithub size={36} />
          <span>Utilize seu usuário do Github para acessar.</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite seu usuário do Github"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            ref={inputRef}
          />
          <button type="submit">
            <FiLogIn color="black" size={24} />
          </button>

        </form>
        {notIsValidUser &&
          <div className={styles.errorLogin}>
            <span>{errorDescription}</span>
          </div>
        }
      </div>

    </div >

  );
}