import Head from 'next/head';

import { Login } from '../components/Login';

export default function Home() {

  return (
    <>
      <Head>
        <title>Home | Try-Moveit</title>
      </Head>
      <Login />
    </>
  )
}

