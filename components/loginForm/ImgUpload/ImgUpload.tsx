import { useEffect, useState } from 'react';
import Image from 'next/image';

// Assets
import defaultImgSrc from '../../../public/images/default-profile.svg';

// Components
import ImgBtn from './ImgBtn';
import Spinner from '../../Spinner';

interface ImgContainerProps {
  readonly src: string;
  readonly alt: string;
};

function ImgContainer({ src, alt }: ImgContainerProps) {
  return (
    <div className="relative h-72 w-52 rounded-xl overflow-hidden bg-black">
      <div className="flex absolute justify-center items-center h-full w-full">
        <Spinner black />
      </div>
      <Image src={ src || defaultImgSrc } alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

interface ImgUploadProps {
  readonly setImg: Function,
  readonly defaultImg?: string;
};

export default function ImgUpload({ setImg, defaultImg }: ImgUploadProps) {
  const [imgSrc, setImgSrc] = useState(defaultImg || '');

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
