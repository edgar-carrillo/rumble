import Image from 'next/image';

import heartIcon from '../../public/images/heart-icon.svg';

interface LikeBtnProps {
  readonly clickHandler: () => void;
  readonly small?: boolean;
  readonly active?: boolean;
};

export default function LikeBtn({ clickHandler, small, active }: LikeBtnProps) {
  let containerClass = 'relative flex shadow-lg rounded-full justify-center items-center transition-all duration-150';
  const btnClass = 'absolute h-full w-full cursor-pointer rounded-full';
  let imgHeightAndWidth = '25px';

  if (small) {
    containerClass += ' w-10 h-10';
    imgHeightAndWidth = '20px';
  }
  else containerClass += ' w-14 h-14';

  if (active) containerClass += ' bg-sunset-orange shadow-black';
  else containerClass += ' bg-dark-jungle-green shadow-white';

  return (
    <div className={containerClass}>
      <Image height={imgHeightAndWidth} width={imgHeightAndWidth} src={heartIcon} alt="#" />
      <input type="button" className={btnClass} onClick={clickHandler} onTouchStart={clickHandler} />
    </div>
  );
}
