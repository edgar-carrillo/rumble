import Image from 'next/image';

import settingsIcon from '../../public/images/settings-icon.svg';

interface SettingsBtnProps {
  readonly clickHandler: () => void;
};

export default function SettingsBtn({ clickHandler }: SettingsBtnProps) {
  return (
    <a href="#" className="relative h-8 w-8" onClick={clickHandler} onTouchStart={clickHandler}>
      <Image src={settingsIcon} alt="#" objectFit="cover" layout="fill" />
    </a>
  );
}
