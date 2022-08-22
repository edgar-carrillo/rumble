import Image from 'next/image';

import favoritesIcon from '../../public/images/favorites-list-icon.svg';

export default function FavoritesBtn() {
  return (
    <a href="#" className="relative h-8 w-8">
      <Image src={favoritesIcon} alt="#" objectFit="cover" layout="fill" />
    </a>
  );
}
