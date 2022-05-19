import Head from 'next/head';
import Image from 'next/image';
import { auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import DesktopPage from './DesktopPage';
import LoginPage from './LoginPage';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="bg-dark-jungle-green">
      <Head>
        <title>Rumble</title>
        <meta name="description" content="Tinder for Restaurants" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {/* --------------- DesktopPage --------------- */}
      <div className="sm:block hidden">
        <DesktopPage />
      </div>
      {/* --------------- Main Home --------------- */}
      <div className="sm:hidden block">
        <LoginPage />
      </div>
    </div>
  )
}
