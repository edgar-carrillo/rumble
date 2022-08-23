import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Firebase
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

// Assets
import imgSrc from '../public/images/people-at-restaurant.jpg';
import MongoDatabase from '../scripts/classes/MongoDatabase';

// Components
import LoadingPage from '../components/loading';
import { HomeBtn } from '../components/Btns';
import Gradient from '../components/Gradient';

export default function LoginPage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const database = new MongoDatabase();
      database.getUser(user.email || '')
        .then((response: any) => {
          if (response.status === 200) router.push('/home');
        })
        .catch((err) => {
          if (err.response.status === 404) router.push('/login-form');
        });
    }
  }, [user, router]);

  if (loading) {
    return (
      <LoadingPage
        title="Verifying Credentials"
        description="Checking our servers for your data."
        isVisible
        centerText
      />
    )
  } else {
    return (
      <div className="relative h-screen">
        {/* ---------- Background ---------- */}
        <div className="absolute h-full w-full">
          <Image src={imgSrc} alt="top down shot of friends eating at a table." layout="fill" objectFit="cover" />
          <Gradient />
          <Gradient />
          <Gradient />
          <Gradient />
          <Gradient />
        </div>
        {/* ---------- Content ---------- */}
        <div className="absolute z-1 bottom-0 p-10 flex flex-col gap-10">
          {/* ---------- Text ---------- */}
          <div>
            <div className="mb-5">
              <h1 className="text-sunset-orange font-logo text-5xl">Rumble</h1>
              <p className="text-white font-bold text-5xl">Swipe, match and choose</p>
            </div>
            <p className="text-star-dust">Make not knowing where to eat a fun experience 🍔</p>
          </div>
          {/* ---------- Buttons ---------- */}
          <div className="flex flex-col gap-5">
            <HomeBtn text="Sign in with Google" clickHandler={() => signInWithRedirect(auth, provider)} />
            <HomeBtn text="Visit More Apps" link="https://www.edgarthedeveloper.com/" secondary />
          </div>
          {/* ---------- Terms and Conditions ---------- */}
          <a
            href="https://github.com/ec-rilo/rumble"
            target="_blank"
            rel="noreferrer"
            className="text-light-white text-center mt-10"
          >
            Github Repository
          </a>
        </div>
      </div>
    );
  }
}
