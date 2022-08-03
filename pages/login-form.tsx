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
import PhotoPage from '../components/loginForm/PhotoPage';

if (typeof window !== 'undefined') {
  if (!localStorage.getItem('username')) localStorage.setItem('username', '');
  if (!localStorage.getItem('location')) localStorage.setItem('location', '');
  if (!localStorage.getItem('cuisine')) localStorage.setItem('cuisine', '');
  if (!localStorage.getItem('photo')) localStorage.setItem('photo', '');
}

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
            userName={localStorage.getItem('username') || user?.displayName || ''}
            isVisible={currPage === 'name-page'}
            goPrevPage={() => logout()}
            goNextPage={() => setCurrPage('location-page')}
          />
          <LocationPage
            userLocation={localStorage.getItem('location') || ''}
            isVisible={currPage === 'location-page'}
            goPrevPage={() => setCurrPage('name-page')}
            goNextPage={() => setCurrPage('cuisine-page')}
          />
          <CuisinePage
            userCuisine={localStorage.getItem('cuisine') || ''}
            isVisible={currPage === 'cuisine-page'}
            goPrevPage={() => setCurrPage('location-page')}
            goNextPage={() => setCurrPage('photo-page')}
          />
          <PhotoPage
            userPhoto={localStorage.getItem('photo') || ''}
            isVisible={currPage === 'photo-page'}
            goPrevPage={() => setCurrPage('cuisine-page')}
            goNextPage={() => {}}
          />
        </form>
      }
    </div>
  );
}
