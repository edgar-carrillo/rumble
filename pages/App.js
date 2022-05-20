import { useEffect } from 'react'

// Firebase
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Components
import { NameForm } from '../components/Forms';

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const addUser = async () => {
      try {
        if (user) {
          const userData = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };

          await setDoc(doc(db, 'users', user.email), userData);
          console.log(user);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    addUser();
  }, [user])

  return (
    <div>
      <NameForm />
    </div>
  )
};