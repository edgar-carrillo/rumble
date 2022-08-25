import React, { useState, useRef, useMemo, createRef, useEffect } from 'react';
import { useRouter } from 'next/router';

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';

// Assets
import User from '../../scripts/classes/User';
import MongoDatabase from '../../scripts/classes/MongoDatabase';

// Components
import TinderCard from 'react-tinder-card';
import HomeHeader from "../../components/home/HomeHeader";
import HomeFooter from '../../components/home/HomeFooter';
import RestaurantCard from '../../components/restaurantCard/RestaurauntCard';
import LoadingPage from '../../components/loading';
import Card from '../../components/Card';

export default function HomePage() {
  const router = useRouter();
  const [firebaseUser, loading, error] = useAuthState(auth);
  const [database] = useState(new MongoDatabase());
  const [user, setUser] = useState(new User({
    username: '',
    email: '',
    location: '',
    cuisine: '',
    photoURL: '',
  }));
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [lastDirection, setLastDirection] = useState('');
  const [lastRestaurantId, setLastRestaurantId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(restaurants.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs: any = useMemo(() => {
    return Array(restaurants.length)
      .fill(0)
      .map((i) => createRef());
  }, [restaurants]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  interface SwipedProps {
    readonly direction: string;
    readonly index: number;
  };

  const swiped = async (swipeData: SwipedProps, restaurantId: string)  => {
    const { direction, index } = swipeData;

    if (direction === 'left') await user.addDislikedRestaurant(restaurantId);
    else await user.addLikedRestaurant(restaurantId);

    setLastDirection(direction);
    setLastRestaurantId(restaurantId);
    updateCurrentIndex(index - 1);
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (swipeData: SwipedProps, restaurantId: string) => {
    const { direction, index } = swipeData;

    if (canSwipe && currentIndex < restaurants.length) {
      await childRefs[currentIndex].current.swipe(direction); // Swipe the card!
      setLastDirection(direction);
      setLastRestaurantId(restaurantId);
      updateCurrentIndex(index - 1);
    }
  };

  const canGoBack = currentIndex < restaurants.length - 1;

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);

    if (lastDirection === 'left') {
      await user.removeDislikedRestaurant(lastRestaurantId);
    } else {
      await user.removeLikedRestaurant(lastRestaurantId);
    }

    const { current }: any = childRefs[newIndex];
    if (current) await current.restoreCard();
  };

  interface LikeDislikeHandlerProps {
    readonly dir: string;
    readonly index: number;
    readonly restaurantId: string;
  };

  const likeHandler = async ({ dir, index, restaurantId }: LikeDislikeHandlerProps) => {
    if (dir === 'right') {
      await swipe({ direction: 'right', index: index }, restaurantId);
    }
  };

  const dislikeHandler = async ({ dir, index, restaurantId }: LikeDislikeHandlerProps) => {
    if (dir === 'left') {
      await swipe({ direction: 'left', index: index }, restaurantId);
    }
  };

  const favoriteHandler = async (isFavorite: boolean, restaurantId: string) => {
    if (isFavorite) await user.addFavoriteRestaurant(restaurantId);
    else await user.removeFavoriteRestaurant(restaurantId);
  };

  useEffect(() => {
    const initUser = async (email: string) => {
      try {
        const userData: any = await database.getUser(email);
        const newUser = new User({
          username: userData.username,
          email: userData.email,
          location: userData.restaurant_preferences.location,
          cuisine: userData.restaurant_preferences.cuisine,
          photoURL: userData.photo_url,
        });

        setUser(newUser);
      } catch(error) {
        router.push('login');
      }
    };

    if (firebaseUser) initUser(firebaseUser.email || '');
  }, [database, firebaseUser, router]);

  useEffect(() => {
    const initRestaurants = async () => {
      const unswipedRestaurants: any = await user.getUnswipedRestaurants();
      if (Array.isArray(unswipedRestaurants)) setRestaurants(unswipedRestaurants);
    };

    if (user.location && user.cuisine) {
      initRestaurants();
    }
  }, [user]);

  /**
   * By default restaurants is an empty array. Once asynchronous data is retrieved
   * the index that's tracking the current card is updated to reflect the
   * new card based on the retrieved restaurants array. Instead of the initial empty
   * array in state.
   */
  useEffect(() => {
    setCurrentIndex(restaurants.length - 1);
  }, [restaurants]);

  return (
    <div>
      { loading ?
        <LoadingPage
          title="Retrieving Data"
          description="Doing final checks in our database for your information. Hang tight!"
          isVisible
          centerText
        /> :
        <div className="relative grid grid-rows-home-layout h-screen">
          <HomeHeader />
          <div className="relative bg-dark-jungle-green overflow-hidden">
            <div className="absolute w-full h-full px-2">
              <Card
                title="Reached end of stack!"
                description="Change your location or reset your swiped cards to see more!"
              />
            </div>
            {restaurants.map((restaurant: any, index) => {
              const restaurantData = {
                id: restaurant.id,
                name: restaurant.name,
                cuisine: restaurant.categories[0].title,
                description: 'Description of the restaurant goes here.',
                isOpen: !restaurant.is_closed,
                averageCost: restaurant.price,
                location: restaurant.location.address1,
                photoSrc: restaurant.image_url,
                isFavorited: restaurant.is_favorited,
              };

              const restaurantHandlers = {
                likeHandler: () => likeHandler({ dir: 'right', index, restaurantId: restaurant.id }),
                dislikeHandler: () => dislikeHandler({ dir: 'left', index, restaurantId: restaurant.id }),
                favoriteHandler,
              };

              return (
                <TinderCard
                  ref={childRefs[index]}
                  key={restaurant.id}
                  className="absolute w-full h-full px-2"
                  onSwipe={(dir) => swiped({ direction: dir, index: index }, restaurant.id)}
                  preventSwipe={['down', 'up']}
                >
                  <RestaurantCard restaurant={restaurantData} handlers={restaurantHandlers} />
                </TinderCard>
              );
            })}
          </div>
          <HomeFooter undoHandler={goBack} />
        </div>
      }
    </div>
  );
}
