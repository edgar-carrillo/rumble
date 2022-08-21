import Image from 'next/image';

import userIcon from '../../public/images/user-icon.svg';

export default function GroupModeBtn() {
  return (
    <a href="#" className="relative h-8 w-8">
      <Image src={userIcon} alt="#" objectFit="cover" layout="fill" />
    </a>
  );
}
