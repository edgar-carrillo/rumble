import { useState } from 'react';
import { useRouter } from 'next/router';

// Firebase
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import BackBtn from './BackBtn';
import { Btn2 } from './Btns';


function NameForm() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const router = useRouter();

  const signOutUser = () => {
    signOut(auth)
      .then((data) => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
      })
  };

  return (
    <div className="bg-dark-jungle-green h-screen w-screen text-white p-5">
      <BackBtn clickHandler={signOutUser} />
      <h1 className="font-thin text-5xl mt-5 mb-14">Enter your name</h1>
      <p className="font-regular text-xl mt-5 mb-10">This is how your friends will view you on Rumble</p>
      <div className="border-solid border-b-2 border-white h-10 mb-14">
        <input type="text" className="w-full h-full border-box bg-transparent outline-0" value={user ? user.displayName : ''} />
      </div>
      <Btn2 text="Next" primary clickHandler={() => console.log()} />
    </div>
  );
}

export { NameForm };