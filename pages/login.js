import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Firebase
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from '../firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Assets
import imgSrc from '../public/images/people-at-restaurant.jpg';

// Components
import LoadingPage from './LoadingPage';
import { Btn1 } from '../components/Btns';

function Gradient() {
  return (
    <div className="absolute h-full w-full bg-gradient-to-t from-black"></div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    router.push('/App');
  }

  const login = () => {
    console.log('logging in');
  }

  if (loading) {
    return (
      <LoadingPage />
    )
  } else {
    return (
      <div className="relative h-screen">
        {/* ---------- Background ---------- */}
        <div className="absolute h-full w-full">
          <Image src={imgSrc} alt="top down shot of friends eating at a table." layout="fill" objectFit="cover"/>
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
              <p className="text-white font-bold text-5xl">Swipe, match and order</p>
            </div>
            <p className="text-star-dust">Make not knowing where to eat a fun experience 🍔</p>
          </div>
          {/* ---------- Buttons ---------- */}
          <div className="flex flex-col gap-5">
            <Btn1 primary text="Create new account" clickHandler={() => signInWithRedirect(auth, provider)} />
            <Btn1 text="Login with email" clickHandler={login} />
          </div>
          {/* ---------- Terms and Conditions ---------- */}
          <a href="https://github.com/ec-rilo/rumble" target="_blank" rel="noreferrer" className="text-star-dust text-center mt-10 oaacity-50">Github Repository</a>
        </div>
      </div>
    );
  }
}