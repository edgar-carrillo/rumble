import { useState } from 'react';
import { useRouter } from 'next/router';

// Firebase
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

// Components
import LoadingPage from '../components/loading';
import NamePage from '../components/loginForm/NamePage';
import LocationPage from '../components/loginForm/LocationPage';
import CuisinePage from '../components/loginForm/CuisinePage';

export default function LoginForm() {
  const [user, loading] = useAuthState(auth);
  const [currPage, setCurrPage] = useState('name-page');
  const router = useRouter();

  function logout() {
    signOut(auth)
      .then(() => {
        router.push('/');
      });
  }

  return (
    <div>
      { loading ?
        <LoadingPage /> :
        <form>
          <NamePage
            userName={user?.displayName || ''}
            isVisible={currPage === 'name-page'}
            goPrevPage={() => logout()}
            goNextPage={() => setCurrPage('location-page')}
          />
          <LocationPage
            userLocation={''}
            isVisible={currPage === 'location-page'}
            goPrevPage={() => setCurrPage('name-page')}
            goNextPage={() => setCurrPage('cuisine-page')}
          />
          <CuisinePage
            isVisible={currPage === 'cuisine-page'}
            goPrevPage={() => setCurrPage('location-page')}
            goNextPage={() => setCurrPage('photo-page')}
          />
        </form>
      }
    </div>
  );
}
