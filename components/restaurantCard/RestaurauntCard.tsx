import { StaticImageData } from 'next/image';
import { useState } from 'react';

// Components
import ImageWithGradients from '../ImageWithGradients';
import TitlesAndSelectors from './TitlesAndSelectors';
import BlackOverlay from './BlackOverlay';
import LikeBtn from '../buttons/LikeBtn';
import DetailsContainer from './DetailsContainer';

interface RestaurantInfoProps {
  readonly id: string;
  readonly name: string;
  readonly cuisine: string;
  readonly description: string;
  readonly isOpen: boolean;
  readonly averageCost: string;
  readonly location: string;
  readonly photoSrc: string | StaticImageData;
  readonly isFavorited: boolean;
};

interface RestaurantHandlersProps {
  readonly likeHandler: () => void;
  readonly dislikeHandler: () => void;
  readonly favoriteHandler: ( arg1: boolean, arg2: string ) => void;
};

interface RestaurantCardProps {
  readonly restaurant: RestaurantInfoProps;
  readonly handlers: RestaurantHandlersProps;
};

export default function RestaurantCard({ restaurant, handlers }: RestaurantCardProps) {
  const [isFavorited, setIsFavorited] = useState(restaurant.isFavorited);
  const [aboutIsExpanded, setAboutIsExpanded] = useState(false);

  const toggleAboutIsExpanded = () => setAboutIsExpanded(!aboutIsExpanded);

  const setAboutIsExpandedFalse = () => setAboutIsExpanded(false);

  const toggleFavorited = () => {
    handlers.favoriteHandler(!isFavorited, restaurant.id);
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <ImageWithGradients src={restaurant.photoSrc} pinkGradient={isFavorited} />
      <TitlesAndSelectors
        title={restaurant.name}
        cuisine={restaurant.cuisine}
        likeHandler={handlers.likeHandler}
        dislikeHandler={handlers.dislikeHandler}
      />
      <div className="absolute right-4 top-4">
        <LikeBtn clickHandler={toggleFavorited} active={isFavorited} small />
      </div>
      <BlackOverlay isVisible={aboutIsExpanded} clickHandler={setAboutIsExpandedFalse} />
      <DetailsContainer
        restaurant={{
          isOpen: restaurant.isOpen,
          averageCost: restaurant.averageCost,
          location: restaurant.location,
          name: restaurant.name,
        }}
        expanded={aboutIsExpanded}
        clickHandler={toggleAboutIsExpanded}
      />
    </div>
  );
}
