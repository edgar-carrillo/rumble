import { useEffect, useState } from 'react';
import Image from 'next/image';

// Assets
import defaultImgSrc from '../../../public/images/default-profile.svg';

// Components
import ImgBtn from './ImgBtn';

interface ImgContainerProps {
  readonly src: string;
  readonly alt: string;
};

function ImgContainer({ src, alt }: ImgContainerProps) {
  return (
    <div className="relative h-72 w-52 rounded-xl overflow-hidden">
      <Image src={ src || defaultImgSrc } alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

export default function ImgUpload({ setImg }: any) {
  const [imgSrc, setImgSrc] = useState('');

  const imgHandler = (imgSrc: any) => {
    if (imgSrc) setImgSrc(imgSrc);
    else setImgSrc('');
  };

  useEffect(() => {
    setImg(imgSrc);
  }, [imgSrc, setImg]);

  return (
    <div className="relative">
      <ImgContainer src={imgSrc} alt={''} />
      <div className="absolute -bottom-4 -right-4">
        <ImgBtn eventHandler={imgHandler} addIcon={!Boolean(imgSrc)} />
      </div>
    </div>
  );
}