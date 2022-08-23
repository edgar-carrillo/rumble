import { useState } from 'react';
import { useRouter } from 'next/router';

// Firebase
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

// Assets
import User from '../scripts/classes/User';
import MongoDatabase from '../scripts/classes/MongoDatabase';

// Components
import LoadingPage from '../components/loading';
import NamePage from '../components/loginForm/NamePage';
import LocationPage from '../components/loginForm/LocationPage';
import CuisinePage from '../components/loginForm/CuisinePage';
import PhotoPage from '../components/loginForm/PhotoPage';
import ErrorPage from '../components/ErrorPage';

if (typeof window !== 'undefined') {
  if (!localStorage.getItem('username')) localStorage.setItem('username', '');
  if (!localStorage.getItem('location')) localStorage.setItem('location', '');
  if (!localStorage.getItem('cuisine')) localStorage.setItem('cuisine', '');
  if (!localStorage.getItem('photo')) localStorage.setItem('photo', '');
}

export default function LoginForm() {
  const [firebaseUser, loading] = useAuthState(auth);
  const [currPage, setCurrPage] = useState('name-page');
  const router = useRouter();

  function logout() {
    signOut(auth)
      .then(() => {
        router.push('/');
      });
  }

  function createUser() {
    const database = new MongoDatabase();
    const user = new User({
      username: localStorage.getItem('username') || '',
      email: firebaseUser?.email || '',
      location: localStorage.getItem('location') || '',
      cuisine: localStorage.getItem('cuisine')?.toLowerCase() || '',
      photoURL: localStorage.getItem('photo') || '',
    });

    return new Promise((resolve, reject) => {
      user.updateWithCloudinaryPhoto()
        .then(() => database.createUser(user.getData()))
        .then(() => {
          localStorage.clear();
          resolve({
            message: 'Added user to database successfully.',
            statusCode: 200,
            userData: user.getData(),
          })
        })
        .catch((error) => reject(error));
    });
  }

  return (
    <div>
      { loading ?
        <LoadingPage
          title="Verifying Credentials"
          description="Just making sure data is squeeky clean."
          centerText
          isVisible
        /> :
        <form>
          <NamePage
            userName={localStorage.getItem('username') || firebaseUser?.displayName || ''}
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
            goNextPage={() => {
              setCurrPage('loading-page');
              createUser()
                .then(() => router.push('/home'))
                .catch((error) => {
                  console.error(error);
                  setCurrPage('error-page');
                });
            }}
          />
          <LoadingPage
            title="Setting up account"
            description="This will only take a second while we set up your profile on our end."
            isVisible={currPage === 'loading-page'}
            centerText
          />
          <ErrorPage
            title="Failed to setup account"
            description="Our apologies. Something occured while setting up your account. Please try again."
            isVisible={currPage === 'error-page'}
            centerText
          />
        </form>
      }
    </div>
  );
}
