import Head from 'next/head';

// Components
import LoginPage from './login';

export default function Home() {
  return (
    <div className="bg-dark-jungle-green">
      <Head>
        <title>Rumble | Restaurant Decision app, done Tinder Style</title>
        <meta name="description" content="Tinder for Restaurants" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <LoginPage />
    </div>
  )
}
