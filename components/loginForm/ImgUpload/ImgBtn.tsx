import { useEffect, useState } from 'react';
import Image from 'next/image';

// Assets
import addIconSrc from '../../../public/images/add-icon.svg';
import closeIconSrc from '../../../public/images/close-icon.svg';

interface ImgBtnProps {
  readonly eventHandler: Function;
  readonly addIcon: Boolean;
};

export default function ImgBtn({ eventHandler, addIcon }: ImgBtnProps) {
  const [baseClass, setBaseClass] = useState('');
  const [iconSrc, setIconSrc] = useState(addIconSrc);

  useEffect(() => {
    let defaultClass = 'relative rounded-full h-12 w-12 overflow-hidden';
    const addBtnClass = ' bg-sunset-orange';
    const closeBtnClass = ' bg-white';

    if (addIcon) {
      defaultClass += addBtnClass;
      setIconSrc(addIconSrc);
    }

    if (!addIcon) {
      defaultClass += closeBtnClass;
      setIconSrc(closeIconSrc);
    }

    setBaseClass(defaultClass);
  }, [addIcon]);

  return (
    <div className={baseClass}>
      <Image src={iconSrc} alt="#" height="50%" width="50%" layout="fill" objectFit="contain" />
      <input
        type="file"
        className="absolute h-full w-full bg-amber opacity-0"
        id="user-img"
        name="user-img"
        accept="image/png, image/jpeg"
        onClick={(e) => {
          if (!addIcon) {
            e.preventDefault();
            eventHandler();
          }
        }}
        onChange={(e) => {
          if (e.target.files && addIcon) {
            const imgSrc = URL.createObjectURL(e.target.files[0]);
            eventHandler(imgSrc);
          }
        }}
      />
    </div>
  );
}
