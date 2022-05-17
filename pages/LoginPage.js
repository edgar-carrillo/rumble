import Image from 'next/image';

// Assets
import imgSrc from '../public/images/people-at-restaurant.jpg';

function Gradient() {
  return (
    <div className="absolute h-full w-full bg-gradient-to-t from-black"></div>
  );
}

function Btn({ text, primary, clickHandler }) {
  let className = 'w-full bg-sunset-orange text-white rounded-3xl p-2.5 font-bold'
  if (!primary) {
    className += ' bg-white text-black'
  }

  return (
    <button className={className} onClick={() => clickHandler()}>{text}</button>
  );
}

export default function LoginPage() {

  const createAccount = () => {
    console.log('creating account!');
  };

  const login = () => {
    console.log('logging in');
  }

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
          <Btn primary text="Create new account" clickHandler={createAccount} />
          <Btn text="Login with email" clickHandler={login} />
        </div>
        {/* ---------- Terms and Conditions ---------- */}
        <a href="https://github.com/ec-rilo/rumble" target="_blank" rel="noreferrer" className="text-star-dust text-center mt-10 oaacity-50">Github Repository</a>
      </div>

    </div>
  );
}