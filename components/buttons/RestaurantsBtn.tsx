import Image from 'next/image';

import restaurantsIcon from '../../public/images/fork-and-knife-icon.svg';

interface RestaurantsBtnProps {
  readonly clickHandler: () => void;
};

export default function RestaurantsBtn({ clickHandler }: RestaurantsBtnProps) {
  return (
    <a href="#" className="relative h-10 w-10" onClick={clickHandler} onTouchStart={clickHandler}>
      <Image src={restaurantsIcon} alt="#" objectFit="cover" layout="fill" />
    </a>
  );
}
